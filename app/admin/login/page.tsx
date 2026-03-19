"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid credentials");
    } else {
      router.push("/admin/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-lg">
        <h1 className="text-white text-2xl mb-4">Admin Login</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input name="username" type="text" placeholder="Username" required className="mb-2 p-2 w-full" />
        <input name="password" type="password" placeholder="Password" required className="mb-4 p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>
    </div>
  );
}