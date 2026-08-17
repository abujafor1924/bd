import { useEffect, useState } from "react";
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import notificationService from "../services/notificationService";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readingId, setReadingId] = useState(null);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await notificationService.getMyNotifications();

      setNotifications(data?.results || []);
    } catch (error) {
      console.error("Notifications error:", error);

      setError(
        error.response?.data?.detail ||
          "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notification) => {
    if (notification.is_read) return;

    try {
      setReadingId(notification.id);

      const updated =
        await notificationService.markAsRead(
          notification.id
        );

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notification.id
            ? {
                ...item,
                ...updated,
                is_read: true,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Mark notification as read error:", error);
    } finally {
      setReadingId(null);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <section className="pb-12">
        <div className="mb-8">
          <div className="h-10 w-52 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-3 h-5 w-80 animate-pulse rounded-lg bg-gray-200" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-[#EEEEEE] bg-white p-5"
            >
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-gray-200" />

                <div className="flex-1">
                  <div className="h-5 w-48 rounded bg-gray-200" />
                  <div className="mt-3 h-4 w-full rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="pb-12">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#D9F7E8]
                px-4
                py-2
                text-sm
                font-semibold
                text-[#2F6FED]
              "
            >
              <Bell size={17} />
              Notifications
            </div>

            <h1
              className="
                mt-5
                text-3xl
                font-extrabold
                text-[#212121]
                md:text-4xl
              "
            >
              Your Notifications
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#7A7A7A] md:text-base">
              Stay updated with your appointments and healthcare
              activities.
            </p>
          </div>

          {notifications.length > 0 && (
            <div
              className="
                inline-flex
                items-center
                gap-2
                self-start
                rounded-full
                border
                border-[#EEEEEE]
                bg-white
                px-4
                py-2
                text-sm
                font-semibold
                text-[#212121]
                shadow-sm
                sm:self-auto
              "
            >
              <BellRing
                size={17}
                className="text-[#2F6FED]"
              />

              {unreadCount} unread
            </div>
          )}
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div
          className="
            mb-5
            rounded-2xl
            border
            border-red-100
            bg-red-50
            px-5
            py-4
            text-sm
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {/* EMPTY */}
      {!error && notifications.length === 0 && (
        <div
          className="
            flex
            min-h-[420px]
            items-center
            justify-center
            rounded-[28px]
            border
            border-[#EEEEEE]
            bg-white
            p-8
            text-center
            shadow-[0_8px_30px_rgba(0,0,0,0.05)]
          "
        >
          <div>
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-[#D9F7E8]
                text-[#2F6FED]
              "
            >
              <Bell size={34} />
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-[#212121]">
              No Notifications
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#7A7A7A]">
              You're all caught up. New appointment and healthcare
              updates will appear here.
            </p>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS */}
      {notifications.length > 0 && (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const isUnread = !notification.is_read;
            const isReading = readingId === notification.id;

            return (
              <div
                key={notification.id}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  bg-white
                  p-5
                  shadow-[0_5px_20px_rgba(0,0,0,0.05)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)]
                  md:p-6
                  ${
                    isUnread
                      ? "border-[#BEE9FF]"
                      : "border-[#EEEEEE]"
                  }
                `}
              >
                {/* Unread indicator */}
                {isUnread && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-[#2F6FED]" />
                )}

                <div className="flex items-start gap-4">
                  {/* ICON */}
                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      min-w-[48px]
                      items-center
                      justify-center
                      rounded-2xl
                      ${
                        isUnread
                          ? "bg-[#D9F7E8] text-[#2F6FED]"
                          : "bg-[#F2F2F2] text-[#7A7A7A]"
                      }
                    `}
                  >
                    {isUnread ? (
                      <BellRing size={21} />
                    ) : (
                      <Bell size={21} />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div className="flex items-center gap-2">
                        <h2
                          className={`
                            text-base
                            leading-6
                            ${
                              isUnread
                                ? "font-extrabold text-[#212121]"
                                : "font-bold text-[#444444]"
                            }
                          `}
                        >
                          {notification.title}
                        </h2>

                        {isUnread && (
                          <span className="h-2 w-2 rounded-full bg-[#2F6FED]" />
                        )}
                      </div>

                      <span className="shrink-0 text-xs text-[#7A7A7A]">
                        {formatDate(notification.created_at)}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#7A7A7A]">
                      {notification.message}
                    </p>

                    {/* ACTION */}
                    <div className="mt-4 flex items-center">
                      {isUnread ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleMarkAsRead(notification)
                          }
                          disabled={isReading}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-[#D9F7E8]
                            px-4
                            py-2
                            text-xs
                            font-bold
                            text-[#2F6FED]
                            transition
                            hover:bg-[#c9f1dc]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                          "
                        >
                          {isReading ? (
                            <>
                              <LoaderCircle
                                size={15}
                                className="animate-spin"
                              />
                              Marking...
                            </>
                          ) : (
                            <>
                              <Check size={15} />
                              Mark as Read
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#7A7A7A]">
                          <CheckCheck
                            size={15}
                            className="text-[#2F6FED]"
                          />
                          Read
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* BOTTOM INFO */}
      {notifications.length > 0 && (
        <div
          className="
            mt-6
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-[#EEEEEE]
            bg-gradient-to-r
            from-[#F8FCFF]
            to-[#F7FFFB]
            px-5
            py-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              min-w-[36px]
              items-center
              justify-center
              rounded-full
              bg-[#D9F7E8]
              text-[#2F6FED]
            "
          >
            <Sparkles size={17} />
          </div>

          <p className="text-xs leading-5 text-[#7A7A7A]">
            Important updates about your healthcare services and
            appointments will appear in your notifications.
          </p>
        </div>
      )}
    </section>
  );
};

export default Notification;