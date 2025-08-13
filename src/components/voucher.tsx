"use client"

import "../assets/styles/scss/components/_voucher.scss"
import {Building2, Calendar, CheckCircle, Clock, Phone, Ticket, XCircle} from "lucide-react"

interface VoucherProps {
  phoneNumber: string
  operatorName: string
  amount: number
  status: string
  ticket: string
  createdAt: string
}

export function Voucher({phoneNumber, operatorName, amount, status, ticket, createdAt}: VoucherProps) {

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-CO", {
      style: "currency",
      currency: "COP",
    }).format(amount)
  }

  const formatter = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short"
  })

  const statusConfig = (status: string) => {
    const statusClasses = {
      SUCCESS: {
        icon: CheckCircle,
        className: "completed",
        label: "¡Recarga Exitosa!",
        description: "Tu recarga se procesó correctamente",
      },
      PENDING: {
        icon: Clock,
        className: "pending",
        label: "¡Recarga Pendiente!",
        description: "La recarga de tu celular está pendiente!"
      },
      FAILED: {
        icon: XCircle,
        className: "failed",
        label: "¡Recarga Fallida!",
        description: "La recarga de tu celular fue fallida!"
      },
    }

    return statusClasses[status as keyof typeof statusClasses];
  }

  const Icon = statusConfig(status).icon

  return (
    <div className="voucher-container">
      <div className={`voucher-card`}>
        <div className="voucher-header">
          <div className="voucher-title">
            <div className={`icon-box ${statusConfig(status).className}`}>
              <Icon className="h-6 w-6"/>
            </div>
            <div>
              <h2>{statusConfig(status).label}</h2>
              <p>{statusConfig(status).description}</p>
            </div>
          </div>
        </div>
        <div className="voucher-amount">
          <p className="label">Monto de la recarga</p>
          <p className="value">{formatAmount(amount)}</p>
        </div>
        <div className="voucher-info">
          <div className="voucher-item">
            <Phone className="h-5 w-5 text-[#14767e] dark:text-[#33b3bf]"/>
            <div>
              <p className="label">Número de celular</p>
              <p className="value">{phoneNumber}</p>
            </div>
          </div>
          <div className="voucher-item">
            <Building2 className="h-5 w-5 text-[#14767e] dark:text-[#33b3bf] "/>
            <div>
              <p className="label">Operador</p>
              <p className="value">{operatorName}</p>
            </div>
          </div>
          <div className="voucher-item">
            <Ticket className="h-5 w-5 text-[#14767e] dark:text-[#33b3bf] "/>
            <div>
              <p className="label">Respuesta Punto Red</p>
              <p className="value">{ticket}</p>
            </div>
          </div>
          <div className="voucher-item">
            <Calendar className="h-5 w-5 text-[#14767e] dark:text-[#33b3bf] "/>
            <div>
              <p className="label">Fecha y hora</p>
              <p className="value">{formatter.format(new Date(createdAt))}</p>
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
