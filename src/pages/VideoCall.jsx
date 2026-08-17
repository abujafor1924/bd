import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";
import { getAgoraToken } from "../services/videoRoomService";

function VideoCall() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const clientRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const localAudioTrackRef = useRef(null);
  const localVideoTrackRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const joinRoom = async () => {
      try {
        setLoading(true);
        setError("");

        // ১. টোকেন ও রুম ইনফো ফেচ
        const room = await getAgoraToken(roomId);
        if (isCancelled) return;

        // ২. ক্লায়েন্ট ইনস্ট্যান্স তৈরি
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        clientRef.current = client;

        // ৩. রিমোট স্টিম লিসেনার (Doctor/Other User)
        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);

          if (mediaType === "video" && remoteVideoRef.current) {
            remoteVideoRef.current.innerHTML = ""; // আগের প্লেয়ার রিমুভ করা
            user.videoTrack.play(remoteVideoRef.current);
          }

          if (mediaType === "audio") {
            user.audioTrack.play();
          }
        });

        client.on("user-unpublished", (user, mediaType) => {
          if (mediaType === "video" && remoteVideoRef.current) {
            remoteVideoRef.current.innerHTML = "";
          }
        });

        client.on("user-left", () => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.innerHTML = "";
          }
        });

        // ৪. চ্যানেলে জয়েন করা
        await client.join(
          room.app_id,
          room.channel,
          room.token,
          null
        );

        if (isCancelled) {
          await client.leave();
          return;
        }

        // ৫. ক্যামেরা ও মাইক্রোফোন ট্র্যাক তৈরি
        const [audioTrack, videoTrack] =
          await AgoraRTC.createMicrophoneAndCameraTracks();

        if (isCancelled) {
          audioTrack.stop();
          audioTrack.close();
          videoTrack.stop();
          videoTrack.close();
          await client.leave();
          return;
        }

        localAudioTrackRef.current = audioTrack;
        localVideoTrackRef.current = videoTrack;

        // ৬. পাবলিক করার আগেই স্টেট আপডেট করা যাতে DOM Ready থাকে
        setLoading(false);
        setJoined(true);

        // ৭. লোকাল ভিডিও প্লে করা (ছোট ডিলে দিয়ে যাতে DOM Mount নিশ্চিত হয়)
        setTimeout(() => {
          if (localVideoRef.current && localVideoTrackRef.current) {
            localVideoTrackRef.current.play(localVideoRef.current);
          }
        }, 100);

        // ৮. চ্যানেলে ট্র্যাক পাবলিক (Publish) করা
        await client.publish([audioTrack, videoTrack]);

      } catch (err) {
        console.error("Agora RTC Error:", err);
        if (!isCancelled) {
          setError(
            err?.response?.data?.detail ||
              err.message ||
              "Unable to join video room."
          );
          setLoading(false);
        }
      }
    };

    joinRoom();

    // ক্লিনআপ ফাংশন (কম্পোনেন্ট আনমাউন্ট হলে)
    return () => {
      isCancelled = true;

      const cleanup = async () => {
        try {
          if (localAudioTrackRef.current) {
            localAudioTrackRef.current.stop();
            localAudioTrackRef.current.close();
            localAudioTrackRef.current = null;
          }

          if (localVideoTrackRef.current) {
            localVideoTrackRef.current.stop();
            localVideoTrackRef.current.close();
            localVideoTrackRef.current = null;
          }

          if (clientRef.current) {
            await clientRef.current.leave();
            clientRef.current.removeAllListeners();
            clientRef.current = null;
          }
        } catch (e) {
          console.error("Cleanup error:", e);
        }
      };

      cleanup();
    };
  }, [roomId]);

  // কন্ট্রোল বাটন লজিক
  const leaveRoom = async () => {
    try {
      if (localAudioTrackRef.current) {
        localAudioTrackRef.current.stop();
        localAudioTrackRef.current.close();
      }

      if (localVideoTrackRef.current) {
        localVideoTrackRef.current.stop();
        localVideoTrackRef.current.close();
      }

      if (clientRef.current) {
        await clientRef.current.leave();
      }
    } catch (err) {
      console.error("Leave room error:", err);
    } finally {
      navigate("/video-consultation");
    }
  };

  const toggleMic = async () => {
    if (!localAudioTrackRef.current) return;
    const nextState = !micOn;
    await localAudioTrackRef.current.setEnabled(nextState);
    setMicOn(nextState);
  };

  const toggleCamera = async () => {
    if (!localVideoTrackRef.current) return;
    const nextState = !cameraOn;
    await localVideoTrackRef.current.setEnabled(nextState);
    setCameraOn(nextState);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-700">Connecting to Video Room...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">{error}</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">Video Consultation</h1>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Your Local Video Container */}
          <div className="rounded-xl bg-white p-3 shadow-md">
            <h2 className="mb-3 text-lg font-bold text-gray-700">You</h2>
            <div
              ref={localVideoRef}
              style={{ width: "100%", height: "420px", backgroundColor: "#000" }}
              className="rounded-lg overflow-hidden relative"
            />
          </div>

          {/* Remote Video Container */}
          <div className="rounded-xl bg-white p-3 shadow-md">
            <h2 className="mb-3 text-lg font-bold text-gray-700">Doctor / Participant</h2>
            <div
              ref={remoteVideoRef}
              style={{ width: "100%", height: "420px", backgroundColor: "#000" }}
              className="rounded-lg overflow-hidden relative"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex justify-center gap-5">
          <button
            onClick={toggleMic}
            className="rounded-full bg-white p-4 shadow-md transition hover:bg-gray-100"
          >
            {micOn ? <Mic size={24} /> : <MicOff size={24} className="text-red-500" />}
          </button>

          <button
            onClick={toggleCamera}
            className="rounded-full bg-white p-4 shadow-md transition hover:bg-gray-100"
          >
            {cameraOn ? <Video size={24} /> : <VideoOff size={24} className="text-red-500" />}
          </button>

          <button
            onClick={leaveRoom}
            className="rounded-full bg-red-600 p-4 text-white shadow-md transition hover:bg-red-700"
          >
            <PhoneOff size={24} />
          </button>
        </div>

        {joined && (
          <p className="mt-4 text-center font-medium text-green-600">
            Connected to channel
          </p>
        )}
      </div>
    </div>
  );
}

export default VideoCall;