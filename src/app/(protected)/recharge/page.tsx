"use client"

import './recharge.scss'
import {Badge} from "@/components/ui/badge"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Building2, CheckCircle, Clock, CreditCard, Plus, Smartphone, XCircle} from "lucide-react"
import {useState} from "react"
import * as Dialog from "@radix-ui/react-dialog";

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
    {
        id: "REC-2024-008",
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
        id: "REC-2024-009",
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
        id: "REC-2024-010",
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
        id: "REC-2024-011",
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
    const [open, setOpen] = useState(false);


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
                <Icon className="w-3 h-3 mr-1"/>
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

    return <>
        <div className="wrapper-recharge">
            <div className="recharge-header">
                <span className="info-recharge">Recargas</span>
                <button onClick={() => setOpen(true)} className="recharge"><Plus className="w-3 h-3"/> Realizar recarga</button>
            </div>
            <div className="recharge-body">
                <Table className="overflow-y-auto">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead
                                className="sticky bg-gray-50 top-0 text-[#384461] font-semibold">Fecha</TableHead>
                            <TableHead
                                className="sticky bg-gray-50 top-0 text-[#384461] font-semibold">Referencia</TableHead>
                            <TableHead
                                className="sticky bg-gray-50 top-0 text-[#384461] font-semibold">Método</TableHead>
                            <TableHead
                                className="sticky bg-gray-50 top-0 text-[#384461] font-semibold">Monto</TableHead>
                            <TableHead
                                className="sticky bg-gray-50 top-0 text-[#384461] font-semibold">Estado</TableHead>
                            <TableHead
                                className="sticky bg-gray-50 top-0 text-[#384461] font-semibold">Descripción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((item) => {
                            const MethodIcon = item.methodIcon
                            return (
                                <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-medium text-[#5C5C5C]">{item.date}</div>
                                            <div className="text-sm text-gray-500">{item.time}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            className="font-mono text-sm text-[#5C5C5C] px-2 py-1 rounded">{item.reference}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <div className="p-1 bg-gray-100 rounded">
                                                <MethodIcon className="w-4 h-4 text-gray-600"/>
                                            </div>
                                            <span className="text-sm text-[#5C5C5C] font-medium">{item.method}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div
                                            className="font-semibold text-lg text-[#5C5C5C]">${item.amount.toFixed(2)}</div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                                    <TableCell>
                                        <span className="text-sm text-[#5C5C5C]">{item.description}</span>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                <Dialog.Content
                    className="z-50 fixed top-1/2 left-1/2 w-[400px] max-w-full bg-white p-6 rounded-3xl shadow-lg
      transform -translate-x-1/2 -translate-y-1/2"
                >
                    <Dialog.Title className="text-lg text-[#384461] font-bold ">
                        Formulario de contacto
                    </Dialog.Title>
                    <Dialog.Description className="mb-4 text-[#5C5C5C]">
                        Completa el formulario y presiona "Guardar" para enviar la información.
                    </Dialog.Description>

                    <form className="space-y-4">

                        form

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-[#008893] text-white rounded"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    </>
}