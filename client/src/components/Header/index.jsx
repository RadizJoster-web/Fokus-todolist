import { motion } from "framer-motion";
import { RiMoonFill, RiSunFill, RiCheckboxCircleFill } from "react-icons/ri";
import "./Header.css";

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <motion.div
        className="header__brand"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header__logo">
          <RiCheckboxCircleFill />
        </div>
        <div className="header__text">
          <h1 className="header__title">Focus</h1>
          <p className="header__subtitle">Task Manager</p>
        </div>
      </motion.div>

      <motion.button
        className="theme-toggle"
        onClick={toggleTheme}
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.08 }}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "dark" ? <RiSunFill /> : <RiMoonFill />}
        </motion.span>
      </motion.button>
    </header>
  );
}
