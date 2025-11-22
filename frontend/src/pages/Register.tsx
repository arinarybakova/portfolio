import { useState } from "react";
import { createUser } from "../api/users";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await createUser(form);
      setMessage(`User created! ID: ${user.id}`);
    } catch (err) {
      setMessage("Error creating user.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Create User</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
        <input
          name="name"
          placeholder="Name"
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="border p-2"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2"
          onChange={handleChange}
        />

        <button className="bg-blue-500 text-white p-2">Register</button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
