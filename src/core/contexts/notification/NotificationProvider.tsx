import { Notification } from "@/core/components";
import { useState } from "react";
import {
  NotificationContext,
  NotificationSettings,
} from "./NotificationContext";

let ids = 0;

interface NotificationItem extends NotificationSettings {
  id: number;
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

export default function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const showNotification = (notification: NotificationSettings) => {
    setNotifications((currentNotifications) =>
      currentNotifications.concat([{ id: ids++, ...notification }])
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      <>
        {children}
        <div className="fixed bottom-10 left-10 flex flex-col items-start gap-2">
          {notifications.map((notification, index) => (
            <Notification
              key={index}
              message={notification.message}
              onClose={() => removeNotification(notification.id)}
              closeTime={7500}
            />
          ))}
        </div>
      </>
    </NotificationContext.Provider>
  );
}
