"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getItem} from "@/services/storage";
import Loader from "@/components/Loader";

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
    return <Loader/>;
  }

  return (
    <div>
      {children}
    </div>
  );
}