"use client";

import './main.scss';
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getItem} from "@/services/storage";
import Image from "next/image";
import logo from '@/assets/images/logo.png';
import {CreditCard, LogOut} from "lucide-react"

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
    return <p>Cargando...</p>;
  }

  return <>
    <div className="wrapper-main">
      <div className="aside-main">
        <div className="aside-header">
          <Image  width={48} height={48} src={logo} alt="Imagen que representa el logo"/>
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
          <div className="option-aside">
            <LogOut className=" w-4 h-4 "/>
            <span>Cerrar sesión</span>
          </div>
          <span className="text-footer">2025 - SG</span>
        </div>
      </div>
      <div className="content-main">{children}</div>
    </div>
  </>;
}