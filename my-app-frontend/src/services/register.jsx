import { useState } from "react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    gender: "",
    address: "",
    pincode: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/register",
        formData,
        {
          withCredentials: true,
        }
      );

      alert(data.message || "Registration Successful");

      setFormData({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        age: "",
        gender: "",
        address: "",
        pincode: "",
        role: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-gray-700 rounded-3xl shadow-xl overflow-hidden">

        <div className="grid md:grid-cols-2">

          {/* Left Side */}
          <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">
              Healthcare Portal
            </h1>

            <p className="text-blue-100">
              Register doctors, patients, pharmacists,
              and administrators securely.
            </p>
          </div>

          {/* Right Side */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Create Account
            </h2>

            <form
              onSubmit={registerUser}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="border rounded-lg p-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border rounded-lg p-3"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border rounded-lg p-3"
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded-lg p-3"
              >
                <option value="">
                  Select Gender
                </option>
                <option value="Male">
                  Male
                </option>
                <option value="Female">
                  Female
                </option>
                <option value="Other">
                  Other
                </option>
              </select>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="border rounded-lg p-3"
              >
                <option value="">
                  Select Role
                </option>
                <option value="Admin">
                  Admin
                </option>
                <option value="Doctor">
                  Doctor
                </option>
                <option value="Patient">
                  Patient
                </option>
                <option value="Pharmacist">
                  Pharmacist
                </option>
              </select>

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border rounded-lg p-3 md:col-span-2"
              />

              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Register Account
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;