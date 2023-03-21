import { useContext } from "react";
import { NotificationContext } from "../contexts/notification/NotificationContext";

export default function useNotifications() {
  return useContext(NotificationContext);
}