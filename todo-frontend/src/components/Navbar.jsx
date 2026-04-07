import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav>
      <div className="nav-brand">
        <Link to="/" className="logo">TaskFlow</Link>
      </div>
      
      {/* Start Task Button - Mobile Only */}
      <button className="start-task-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "Close" : "Start Task"}
      </button>

      {/* Nav Links - Toggle on mobile */}
      <div className={`nav-links ${isMenuOpen ? "nav-open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
        <Link to="/login" onClick={closeMenu}>Login</Link>
        <Link to="/signup" onClick={closeMenu}>Signup</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
