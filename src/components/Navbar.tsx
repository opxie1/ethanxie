import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BarChart3 } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/pitch-decks", label: "Pitch Decks", icon: BarChart3 },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="navbar-float"
    >
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="navbar-brand-accent">E</span>X
        </Link>

        <div className="navbar-links">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`navbar-link ${isActive ? "navbar-link-active" : ""}`}
              >
                <item.icon className="navbar-link-icon" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="navbar-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
