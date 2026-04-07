import { useState } from "react";
import { signupUser } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 MUST

    try {
      await signupUser(form);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;