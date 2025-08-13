"use client"

import "../assets/styles/scss/components/_voucher.scss"
import {Building2, Calendar, Phone, Smartphone, Ticket} from "lucide-react"

interface VoucherProps {
  phoneNumber: string
  operatorName: string
  amount: number
  status: "SUCCESS" | "PENDING" | "FAILED"
  ticket: string
  createdAt: string
}

export function Voucher({phoneNumber, operatorName, amount, status, ticket, createdAt}: VoucherProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  return (
    <div className="voucher-container">
      <div className={`voucher-card ${status}`}>
        <div className="voucher-header">
          <div className="voucher-title">
            <div className="icon-box">
              <Smartphone className="h-6 w-6 text-white"/>
            </div>
            <div>
              <h2>Confirmación de tu recarga</h2>
              <p>La recarga de tu telefono fue un éxito!</p>
            </div>
          </div>
          <div className={`voucher-status ${status}`}>
            {status}
          </div>
        </div>

        <div className="voucher-amount">
          <p className="label">Monto de la recarga</p>
          <p className="value">{formatAmount(amount)}</p>
        </div>

        <div className="voucher-info">
          <div className="voucher-item">
            <Phone className="h-5 w-5 text-orange-600 dark:text-orange-400"/>
            <div>
              <p className="label">Número de celular</p>
              <p className="value">{phoneNumber}</p>
            </div>
          </div>

          <div className="voucher-item">
            <Building2 className="h-5 w-5 text-orange-600 dark:text-orange-400"/>
            <div>
              <p className="label">Operador</p>
              <p className="value">{operatorName}</p>
            </div>
          </div>
        </div>

        <hr/>

        <div className="voucher-details">
          <div className="voucher-item">
            <Ticket className="h-5 w-5 text-slate-500 dark:text-slate-400"/>
            <div>
              <p className="label">Respuesta Punto Red</p>
              <p className="code">{ticket}</p>
            </div>
          </div>

          <div className="voucher-item">
            <Calendar className="h-5 w-5 text-slate-500 dark:text-slate-400"/>
            <div>
              <p className="label">Fecha y hora</p>
              <p className="value">{formatDate(createdAt)}</p>
            </div>
          </div>
        </div>

        <div className="voucher-footer">
          <p>Gracias por escoger nuestro servicio</p>
        </div>
      </div>
    </div>
  );
}
