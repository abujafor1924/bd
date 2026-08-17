import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Video,
  Calendar,
  Clock,
  ArrowRight,
  VideoIcon,
} from "lucide-react";

import { getMyVideoRooms } from "../services/videoRoomService";

function VideoConsultation() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================
  // LOAD MY VIDEO ROOMS
  // =====================================

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyVideoRooms();

        if (Array.isArray(data)) {
          setRooms(data);
        } else if (Array.isArray(data?.results)) {
          setRooms(data.results);
        } else {
          setRooms([]);
        }
      } catch (err) {
        console.error("Video rooms loading error:", err);
        setRooms([]);
        setError("Unable to load your video consultations.");
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  // =====================================
  // FORMAT DATE & TIME
  // =====================================

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // =====================================
  // LOADING STATE
  // =====================================

  if (loading) {
    return (
      <section className="w-full min-w-0">
        <div className="mb-8">
          <div className="h-9 w-64 animate-pulse rounded bg-gray-200" />
          <div className="mt-3 h-5 w-96 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[240px] animate-pulse rounded-[16px] bg-gray-200"
            />
          ))}
        </div>
      </section>
    );
  }

  // =====================================
  // MAIN VIEW
  // =====================================

  return (
    <section className="w-full min-w-0">
      {/* HEADER */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#D9F7E8] px-4 py-2 text-sm font-semibold text-[#2F6FED]">
          <Video size={17} />
          <span>Video Consultation</span>
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-[#212121] md:text-3xl">
          My Video Consultations
        </h1>

        <p className="mt-2 text-[#7A7A7A]">
          Join and manage your scheduled video consultations.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 rounded-[16px] border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* NO ROOMS */}
      {!rooms.length ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[16px] border border-[#EEEEEE] bg-white px-6 py-10 text-center shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D9F7E8] text-[#2F6FED]">
            <VideoIcon size={30} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-[#212121]">
            No Video Consultations
          </h2>

          <p className="mt-2 max-w-md text-sm text-[#7A7A7A]">
            You don't have any video consultation rooms right now.
          </p>

          <Link
            to="/book-appointment"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2F6FED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#245bd0]"
          >
            <span>Book Appointment</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        /* ROOMS GRID */
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="overflow-hidden rounded-[16px] border border-white/20 bg-gradient-to-r from-[#BEE9FF] to-[#DFF8EF] shadow-[-3px_-3px_6px_rgba(255,255,255,0.20),3px_4px_8px_rgba(0,0,0,0.13)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[-3px_-3px_8px_rgba(255,255,255,0.25),3px_5px_10px_rgba(0,0,0,0.16)]"
            >
              {/* CARD BODY */}
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2F6FED] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                    <Video size={24} />
                  </div>

                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-[#2F6FED]">
                    Video Room
                  </span>
                </div>

                <h2 className="mt-5 line-clamp-2 text-lg font-bold text-[#212121]">
                  {room.room_name || "Video Consultation"}
                </h2>

                <div className="mt-4 flex items-center gap-2 text-sm text-[#7A7A7A]">
                  <Calendar size={16} />
                  <span>{formatDate(room.created_at)}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-[#7A7A7A]">
                  <Clock size={16} />
                  <span>{formatTime(room.created_at)}</span>
                </div>

                <p className="mt-3 text-xs text-[#7A7A7A]">
                  Room ID:{" "}
                  <span className="font-semibold text-[#212121]">
                    {room.id}
                  </span>
                </p>
              </div>

              {/* CARD FOOTER */}
              <div className="border-t border-white/40 px-5 py-4">
                <Link
                  to={`/video-consultation/${room.id}`}
                  className="flex items-center justify-between text-sm font-semibold text-[#212121]"
                >
                  <span>Join Consultation</span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-[#2F6FED] transition-all duration-300 hover:translate-x-1">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default VideoConsultation;