import { createContext } from "react";

export interface NotificationSettings {
  message: string;
}

interface NotificationContextProps {
  showNotification: (notification: NotificationSettings) => void;
}

export const NotificationContext = createContext<NotificationContextProps>({showNotification: () => {}});