"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getItem} from "@/services/storage";

export default function ProtectedLoginLayout({children}: { children: React.ReactNode; }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getItem('token');

    if (token) {
      router.replace("/recharge");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      {children}
    </div>
  );
}