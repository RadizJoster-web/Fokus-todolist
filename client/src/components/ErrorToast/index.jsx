import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiErrorWarningLine, RiCloseLine } from "react-icons/ri";
import "./ErrorToast.css";

export default function ErrorToast({ message, onDismiss }) {
  // Auto-dismiss setelah 5 detik
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="error-toast"
          role="alert"
          aria-live="assertive"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <RiErrorWarningLine className="error-toast__icon" />
          <span className="error-toast__msg">{message}</span>
          <button
            className="error-toast__close"
            onClick={onDismiss}
            aria-label="Dismiss error"
          >
            <RiCloseLine />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
