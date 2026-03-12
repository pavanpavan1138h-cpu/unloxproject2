"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        fetchUser();
      } else {
        setLoading(false);
      }
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    if (typeof window !== "undefined") {
      localStorage.setItem("token", res.data.token);
    }

    setUser(res.data.user);
    router.push("/dashboard");
  };

  const register = async (name, email, password, phone) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
      phone,
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("token", res.data.token);
    }

    setUser(res.data.user);
    router.push("/dashboard");
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    setUser(null);
    router.push("/login");
  };

  return { user, loading, login, register, logout };
};
