"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LoginLogoutButton() {
  const [logged, setLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLogged(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setLogged(false);
    router.push("/login");
  };

  if (logged) {
    return (
      <Button variant="outline" className="px-5 py-1 text-lg" onClick={handleLogout}>
        Logout
      </Button>
    );
  }

  return (
    <Link href="/login/" className="px-5 py-1 text-lg">
      <Button variant="outline">Login</Button>
    </Link>
  );
}