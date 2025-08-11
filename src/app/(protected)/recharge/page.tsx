"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, CheckCircle, Clock, CreditCard, Smartphone, XCircle} from "lucide-react"
import { useState } from "react"

const rechargeData = [
  {
    id: "REC-2024-001",
    date: "2024-01-15",
    time: "14:30:25",
    amount: 50.0,
    method: "Tarjeta de Crédito",
    methodIcon: CreditCard,
    status: "Completada",
    reference: "TXN-789456123",
    description: "Recarga de saldo",
  },
  {
    id: "REC-2024-002",
    date: "2024-01-14",
    time: "09:15:42",
    amount: 25.0,
    method: "Transferencia",
    methodIcon: Building2,
    status: "Completada",
    reference: "TXN-789456124",
    description: "Recarga automática",
  },
  {
    id: "REC-2024-003",
    date: "2024-01-13",
    time: "16:45:18",
    amount: 100.0,
    method: "Billetera Digital",
    methodIcon: Smartphone,
    status: "Pendiente",
    reference: "TXN-789456125",
    description: "Recarga de saldo",
  },
  {
    id: "REC-2024-004",
    date: "2024-01-12",
    time: "11:20:33",
    amount: 75.0,
    method: "Tarjeta de Débito",
    methodIcon: CreditCard,
    status: "Completada",
    reference: "TXN-789456126",
    description: "Recarga express",
  },
  {
    id: "REC-2024-005",
    date: "2024-01-11",
    time: "13:55:07",
    amount: 30.0,
    method: "Transferencia",
    methodIcon: Building2,
    status: "Fallida",
    reference: "TXN-789456127",
    description: "Recarga de saldo",
  },
  {
    id: "REC-2024-006",
    date: "2024-01-10",
    time: "08:30:15",
    amount: 200.0,
    method: "Tarjeta de Crédito",
    methodIcon: CreditCard,
    status: "Completada",
    reference: "TXN-789456128",
    description: "Recarga premium",
  },
]

export default function RechargePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("Todos")

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Completada: {
        variant: "default" as const,
        icon: CheckCircle,
        className: "bg-green-100 text-green-800 hover:bg-green-200",
      },
      Pendiente: {
        variant: "secondary" as const,
        icon: Clock,
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      },
      Fallida: {
        variant: "destructive" as const,
        icon: XCircle,
        className: "bg-red-100 text-red-800 hover:bg-red-200",
      },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    )
  }

  const filteredData = rechargeData.filter((item) => {
    const matchesSearch =
      item.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "Todos" || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return(
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="font-semibold">Fecha</TableHead>
          <TableHead className="font-semibold">Referencia</TableHead>
          <TableHead className="font-semibold">Método</TableHead>
          <TableHead className="font-semibold">Monto</TableHead>
          <TableHead className="font-semibold">Estado</TableHead>
          <TableHead className="font-semibold">Descripción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredData.map((item) => {
          const MethodIcon = item.methodIcon
          return (
            <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-gray-900">{item.date}</div>
                  <div className="text-sm text-gray-500">{item.time}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{item.reference}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className="p-1 bg-gray-100 rounded">
                    <MethodIcon className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium">{item.method}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-semibold text-lg text-gray-900">${item.amount.toFixed(2)}</div>
              </TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">{item.description}</span>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}