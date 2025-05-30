import apiRequest from "../../lib/apiRequest";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [error, setError] = useState("");
  const [isLoding,setIsLoding] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoding(true);

    const formData = new FormData(e.target) 

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
      username,email,password
    })
     navigate("/login");
    } catch (err) {
      setError(err.response.data.Message);
    } finally {
      setIsLoding(false);
    }
  }

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoding}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;