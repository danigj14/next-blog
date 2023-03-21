import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
  closeTime?: number;
}

export default function Notification({
  message,
  onClose = () => {},
  closeTime = 0,
}: NotificationProps) {
  useEffect(() => {
    if (closeTime > 0) {
      const timeoutId = setTimeout(onClose, closeTime);

      return () => clearTimeout(timeoutId);
    }
  });

  return (
    <div className="px-10 py-5 border rounded-lg shadow bg-green-600 text-gray-50 relative">
      <button className="absolute top-0 right-2" onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <FontAwesomeIcon icon={faCheck} className="pr-2" />{message}
    </div>
  );
}
