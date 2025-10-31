"use client";

import { useState, useEffect } from "react";
import { ShinyButton } from "@/components/ui/shiny-button"
import { AuroraText } from "@/components/ui/aurora-text"


export default function HomePage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers(); // Page load pe users fetch karo
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    setMessage(data.message);
    setName("");
    fetchUsers(); // Save ke baad list update karo
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-8">
   
      <AuroraText
      className="text-4xl font-bold text-gray-800 mb-6">Enter Your Name</AuroraText>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        {/* <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Save
        </button> */}
        <ShinyButton
         type="submit">Save</ShinyButton>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}

      <div className="mt-6 w-full max-w-xs">
        <h2 className="text-xl font-semibold mb-2">Saved Users:</h2>
        <ul className="list-disc pl-5">
          {users.map((u) => (
            <li key={u._id}>{u.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
