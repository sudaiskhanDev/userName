"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Skiper30 } from "@/components/ui/skiper-ui/skiper30";
function Loader() {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </motion.div>
  );
}
export default function HomePage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      setMessage(data.message);
      setName("");
      await fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      setMessage(data.message);
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (<>
   
 
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col justify-center items-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-blue-700 mb-6 tracking-wide"
      >
        Enter Your Name
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-xl shadow-xl"
      >
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          required
        />
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-md text-white font-semibold transition-all duration-300 flex justify-center items-center ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 shadow-lg"
          }`}
        >
          {loading ? <Loader /> : "Save"}
        </motion.button>
      </motion.form>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-green-600 font-medium"
        >
          {message}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Saved Users:</h2>
        {loading ? (
          <div className="flex justify-center items-center py-2">
            <Loader />
          </div>
        ) : users.length === 0 ? (
          <p className="text-gray-400 italic">No users saved yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {users.map((u) => (
              <li key={u._id} className="flex justify-between items-center text-gray-700">
                <span>{u.name}</span>
                <button
                  onClick={() => handleDelete(u._id)}
                  className="text-red-500 hover:underline text-sm ml-4 transition-all duration-200"
                  disabled={loading}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
     <Skiper30 />
     </>
  );
}
