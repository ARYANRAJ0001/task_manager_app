import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;