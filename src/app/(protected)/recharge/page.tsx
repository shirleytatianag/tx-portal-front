"use client"

import './recharge.scss'
import {Badge} from "@/components/ui/badge"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {ArrowLeft, ArrowRight, CheckCircle, Clock, Globe, Plus, Search, XCircle} from "lucide-react"
import {useEffect, useState} from "react"
import * as Dialog from "@radix-ui/react-dialog";
import * as yup from "yup";
import {ObjectSchema} from "yup";
import {
  RechargeRequest,
  RechargeResponse,
  RechargeSchema,
  Supplier
} from "@/app/(protected)/recharge/recharge.interface";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Recharge} from "@/services/recharge";
import Loader from "@/components/Loader";
import {showToast} from "@/services/alert";


const schema: ObjectSchema<RechargeSchema> = yup.object({
  phone_number: yup.string().required('El número de celular es obligatorio').matches(/^3\d{9}$/, "El número de teléfono debe tener 10 dígitos y comenzar con 3"),
  operator_id: yup.object({
    id: yup.string().required('Debes seleccionar un operador'),
    name: yup.string().required('Debes seleccionar un operador')
  }).required('Debes seleccionar un operador'),
  amount: yup.number().typeError('El monto debe ser un número').required('El monto es requerido')
    .positive('El monto debe ser mayor a cero').min(10000, 'El monto debe ser mayor a 10.000')
    .max(100000, 'El monto debe ser menor a 100.000'),
})

export default function RechargePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isPageable, setIsPageable] = useState(false);
  const [operators, setOperators] = useState<Supplier[]>([])
  const [recharges, setRecharges] = useState<RechargeResponse[]>([])
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm(
    {resolver: yupResolver(schema),}
  );

  console.log(errors)

  useEffect(() => {
    setLoading(true);
    getSuppliers().then();
    getRecharges(page).then();
  }, [])

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  useEffect(() => {
    getRecharges(page)
  }, [page])

  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  if (loading) {
    return <Loader/>;
  }

  const getSuppliers = async () => {
    try {
      const data = await Recharge.getSuppliers()
      setOperators(data)
    } catch (error) {
      console.error("Error cargando operadores:", error)
    }
  }

  const getRecharges = async (page: number) => {
    try {
      const data = await Recharge.getRecharges(page);
      setRecharges(data.content);
      setLoading(false);
      setTotalPages(data.totalPages)
      setIsPageable(data.totalElements > data.size);
    } catch (error) {
      console.error("Error cargando recargas:", error);
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

  const onSubmit = (data: RechargeSchema) => {
    setLoading(true);
    const rechargeRequest: RechargeRequest = {
      amount: data.amount,
      operator_id: data.operator_id.id,
      operator_name: data.operator_id.name,
      phone_number: data.phone_number,
    }

    Recharge.recharge(rechargeRequest)
      .then((response) => {
        showToast("Recarga realizada", "La recarga se realizó correctamente.",
          4000, "success");
        setLoading(false);
        setOpen(false);
        reset();
        // Todo voucher de recarga realizada.
      })
      .catch((error) => {
        showToast("No se realizó la recarga", error.response.data.message,
          4000, "warning");
        setLoading(false);
      })
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
                <TableRow key={item.recharge_id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-[#5C5C5C]">{formatter.format(new Date(item.created_at))}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="font-mono text-sm bg-gray-100 px-2 py-1 rounded  text-[#5C5C5C]">{item.phone_number}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-gray-100 rounded">
                        <Globe className="w-4 h-4 text-gray-600"/>
                      </div>
                      <span className="text-sm text-[#5C5C5C] font-medium">{item.operator_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-sm text-[#5C5C5C]">${item.amount.toFixed(2)}</div>
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
              <button className="btn-next" onClick={prevPage} disabled={page === 1}>
                <ArrowLeft className="w-4 h-4 text-gray-600"/>
              </button>
              <span className="self-center text-xs text-[#5C5C5C]">
                Página {page + 1} de {totalPages}
              </span>
              <button className="btn-next" onClick={nextPage} disabled={page === totalPages}>
                <ArrowRight className="w-4 h-4 text-gray-600"/>
              </button>
            </div>
          )
        }
      </div>
    </div>
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40"/>
        <Dialog.Content
          className="z-50 fixed top-1/2 left-1/2 w-[400px] max-w-full bg-white p-6 rounded-2xl shadow-lg
      transform -translate-x-1/2 -translate-y-1/2"
        >
          <Dialog.Title className="text-base text-[#384461] font-bold ">
            Realizar recarga
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-[#5C5C5C] text-sm">
            Dinos a quién, cuánto y con qué operador.
          </Dialog.Description>

          <form className="space-y-4 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">Número de celular</label>
              <input
                {...register("phone_number", {required: true})}
                className={`form-input ${errors.phone_number && 'input-error'}`}
                type="cel"
                maxLength={10}
                placeholder="Número de celular"
              />
              {errors.phone_number && (<small className="error">{errors.phone_number.message}</small>)}
            </div>
            <div className="form-group">
              <label className="form-label">Monto de la recarga</label>
              <input
                {...register("amount", {required: true})}
                className={`form-input ${errors.amount && 'input-error'}`}
                type="text"
                maxLength={6}
                placeholder="Número de celular"
              />
              {errors.amount && (<small className="error">{errors.amount.message}</small>)}
            </div>
            <div className="form-group">
              <label className="form-label">Operador</label>
              <Controller
                name="operator_id"
                control={control}
                render={({field}) => (
                  <Select
                    value={field.value?.id}
                    onValueChange={(value) => {
                      const selectedOp: Supplier | undefined = operators.find(op => op.id === value);
                      if (selectedOp) field.onChange(selectedOp);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un operador"/>
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {operators.map((op) => (
                        <SelectItem key={op.id} value={op.id}>
                          {op.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.operator_id && (
                <small className="error">{errors.operator_id.id.message}</small>
              )}
            </div>
            <div className="mt-2.5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm bg-gray-300 cursor-pointer rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-[#008893] cursor-pointer text-white rounded"
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