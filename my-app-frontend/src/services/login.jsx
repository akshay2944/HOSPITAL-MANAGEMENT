import { useState } from "react";
import axios from "axios";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        credentials,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      alert("Login Successful");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <form
        onSubmit={loginUser}
        className="bg-gray-600 p-8 rounded-2xl shadow-lg w-full max-w-md bg-gray-950"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter Email"
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;