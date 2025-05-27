import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";

export default function Signin() {
  const navigate = useNavigate();
  const { signIn, setSession } = useSignIn();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      // Set session to finalize login
      await setSession(result.createdSessionId);

      navigate("/tracked-products");
    } catch (err) {
      setError(err.errors ? err.errors[0]?.message : "Signin failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-700">
          Welcome Back
        </h2>
        {error && (
          <p className="text-red-600 mb-3 text-center font-medium">{error}</p>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Sign In
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
