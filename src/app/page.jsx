"use client";

import { useState, useEffect } from "react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { AuroraText } from "@/components/ui/aurora-text";

export default function HomePage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state

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
    fetchUsers(); // Page load pe users fetch karo
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
      await fetchUsers(); // Save ke baad list update karo
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
      <AuroraText className="text-4xl font-bold text-gray-800 mb-6">
        Enter Your Name
      </AuroraText>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <ShinyButton type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </ShinyButton>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      <div className="mt-6 w-full max-w-xs">
        <h2 className="text-xl font-semibold mb-2">Saved Users:</h2>
        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : (
          <ul className="list-disc pl-5">
            {users.map((u) => (
              <li key={u._id}>{u.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
