import React, { useState } from "react";
import { auth } from "./firebaseConfig";  // Importiere die Firestore-Konfiguration
import { signInWithEmailAndPassword } from "firebase/auth"; // Importing the function for email/password sign-in
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/admin"; // Redirect after successful login
    } catch (error) {
      setError("Fehler beim Anmelden: " + error.message);
    }
  };

  return (
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">

    <h2 class="text-3xl font-semibold text-center text-gray-700 mb-6">Admin Login</h2>

    <form onSubmit={handleLogin}>
      <div class="mb-4">
        <label htmlFor="email" class="block text-gray-600 font-medium mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="mb-6">
        <label htmlFor="password" class="block text-gray-600 font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          required
        />
      </div>

      {error && (
        <div class="text-red-500 text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Login
      </button>
    </form>

  </div>
</div>

  );
};

export default Login;
