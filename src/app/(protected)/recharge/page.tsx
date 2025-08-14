"use client"

import './recharge.scss'
import {Badge} from "@/components/ui/badge"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {ArrowLeft, ArrowRight, Building2, CheckCircle, Clock, Plus, Search, XCircle} from "lucide-react"
import {useEffect, useState} from "react"
import {RechargeResponse} from "@/app/(protected)/recharge/recharge.interface";
import {Recharge} from "@/services/recharge";
import Loader from "@/components/loader";
import Modal from "@/components/modal";
import RechargeForm from "@/app/(protected)/recharge/components/RechargeForm/RechargeForm";
import {Voucher} from '@/app/(protected)/recharge/components/Voucher/Voucher'


export default function RechargePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false);
  const [openVoucher, setOpenVoucher] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isPageable, setIsPageable] = useState(false);
  const [recharges, setRecharges] = useState<RechargeResponse[]>([])
  const [loading, setLoading] = useState(false);
  const [rechargeItem, setRechargeItem] = useState({
    recharge_id: "",
    phone_number: "",
    operator_name: "",
    amount: 0,
    status: "SUCCESS",
    puntored_transaction_id: "",
    ticket: "",
    created_at: ""
  });

  useEffect(() => {
    if (!open) {
      setLoading(true);
      getRecharges(page);
    }
  }, [page, open]);

  const nextPage = () => {
    if (page < (totalPages - 1)) setPage((prev) => prev + 1)
  }

  const prevPage = () => {
    if (page >= 0) setPage((prev) => prev - 1)
  }

  if (loading) {
    return <Loader/>;
  }

  const getRecharges = async (page: number) => {
    try {
      const data = await Recharge.getRecharges(page);
      setRecharges(data.content);
      setLoading(false);
      setTotalPages(data.totalPages)
      setIsPageable(data.totalElements > data.size);
    } catch (error) {
      setLoading(false);
    }
  }

  const formatter = new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short"
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      SUCCESS: {
        name: "Completada",
        variant: "default" as const,
        icon: CheckCircle,
        className: "bg-green-100 text-green-800 hover:bg-green-200",
      },
      PENDING: {
        name: "Pendiente",
        variant: "secondary" as const,
        icon: Clock,
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      },
      FAILED: {
        name: "Fallida",
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
        {config.name}
      </Badge>
    )
  }

  const getClassOperator = (operatorName: string) => {
    switch (operatorName) {
      case 'Claro':
        return 'text-red-800';
      case 'Movistar':
        return 'text-blue-800';
      case 'Tigo':
        return 'text-yellow-800';
      case 'wom':
        return 'text-purple-800';
      default:
        return 'text-[#5C5C5C]';
    }
  }

  const handleOpenVoucher = (recharge: RechargeResponse) => {
    setRechargeItem(recharge);
    setOpenVoucher(true);
  }

  const filteredData = recharges.filter((item) => {
    return item.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.operator_name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return <>
    <div className="wrapper-recharge">
      <div className="recharge-header">
        <span className="info-recharge">Recargas</span>
        <div className="options-header">
          <div className="container-search">
            <input type="text" value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)} className="search"
                   placeholder="Busca por número, operador..."/>
            <Search className="w-4 h-4 text-[#5C5C5C]"/>
          </div>
          <button onClick={() => setOpen(true)} className="recharge"><Plus className="w-3 h-3"/> Realizar recarga
          </button>
        </div>
      </div>
      <div className="recharge-body rounded-lg border">
        <Table className="overflow-y-auto">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead
                className="sticky bg-gray-50 top-0 text-[#384461] font-semibold">Fecha</TableHead>
              <TableHead
                className="sticky bg-gray-50 top-0 text-[#384461] font-semibold">Número celular</TableHead>
              <TableHead
                className="sticky bg-gray-50 top-0 text-[#384461] font-semibold">Operador</TableHead>
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
              return (
                <TableRow key={item.recharge_id} className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleOpenVoucher(item)}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-[#5C5C5C]">{formatter.format(new Date(item.created_at))}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="text-sm  px-2 py-1 rounded  text-[#5C5C5C]">{item.phone_number}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-gray-100 rounded">
                        <Building2 className={`w-4 h-4 ${getClassOperator(item.operator_name)}`}/>
                      </div>
                      <span
                        className={`font-medium text-sm ${getClassOperator(item.operator_name)}`}>{item.operator_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-sm text-[#5C5C5C]">${item.amount.toFixed(2)}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <span className="text-sm text-[#5C5C5C]">{item.ticket}</span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto"/>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No se encontraron resultados</h3>
            <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
        {
          isPageable && (
            <div className="absolute bg-white bottom-1 right-1 flex justify-end gap-2 mt-4">
              <button className="btn-next" onClick={prevPage} disabled={page === 0}>
                <ArrowLeft className="w-4 h-4 text-gray-600"/>
              </button>
              <span className="self-center text-xs text-[#5C5C5C]">
                Página {page + 1} de {totalPages}
              </span>
              <button className="btn-next" onClick={nextPage} disabled={(page + 1) === totalPages}>
                <ArrowRight className="w-4 h-4 text-gray-600"/>
              </button>
            </div>
          )
        }
      </div>
    </div>
    <Modal open={open} onOpenChange={setOpen}>
      <RechargeForm/>
    </Modal>
    <Modal open={openVoucher} onOpenChange={setOpenVoucher}>
      <Voucher phoneNumber={rechargeItem.phone_number} operatorName={rechargeItem.operator_name}
               amount={rechargeItem.amount}
               status={rechargeItem.status} ticket={rechargeItem.ticket} createdAt={rechargeItem.created_at}/>
    </Modal>
  </>
}