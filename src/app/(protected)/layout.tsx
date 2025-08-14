"use client";

import './main.scss';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getItem, removeAll} from "@/services/storage";
import {CreditCard, LogOut} from "lucide-react"
import Loader from "@/components/loader";

export default function ProtectedLayout({children,}: { children: React.ReactNode; }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getItem('token');

    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <Loader/>;
  }

  const handleLogout = () => {
    removeAll()
    router.push('/login');
  }

  return <>
    <div className="wrapper-main">
      <div className="aside-main">
        <div className="aside-header">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#19949E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div className="description-aside">
            <span>Bienvenido a</span>
            <span>TX-Portal</span>
          </div>
        </div>
        <div className="aside-body">
          <div className="module module-active">
            <CreditCard className="icon w-4 h-4 "/>
            <span>Recargas</span>
          </div>
        </div>
        <div className="aside-footer">
          <div className="option-aside" onClick={handleLogout}>
            <LogOut className=" w-4 h-4 "/>
            <span>Cerrar sesión</span>
          </div>
          <span className="text-footer">© 2025 Portal Transaccional</span>
        </div>
      </div>
      <div className="content-main">{children}</div>
    </div>
  </>;
}