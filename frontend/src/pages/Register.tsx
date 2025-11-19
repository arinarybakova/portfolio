import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register user:", form);
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
    </div>
  );
}
