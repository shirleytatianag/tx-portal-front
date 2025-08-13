"use client"

import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {ObjectSchema} from "yup";
import {RechargeRequest, RechargeSchema, Supplier} from "@/app/(protected)/recharge/recharge.interface";
import {Recharge} from "@/services/recharge";
import {useEffect, useState} from "react";
import Loader from "@/components/Loader";
import {showToast} from "@/services/alert";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Voucher} from "@/components/voucher";

type Props = { setOpen: (v: boolean) => void, setRecharge: (v: boolean) => void };


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
export default function RechargeForm({setOpen, setRecharge}: Props) {
  const [operators, setOperators] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState(1);
  const [response, setResponse] = useState({
    recharge_id: "",
    phone_number: "",
    operator_name: "",
    amount: 0,
    status: "SUCCESS",
    puntored_transaction_id: "",
    ticket: "",
    created_at: ""
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm(
    {resolver: yupResolver(schema),}
  );

  useEffect(() => {
    getSuppliers();
  }, []);

  useEffect(() => {
    if (!open) {
      reset()
    }
  }, [open, reset])

  if (loading) {
    return <Loader height={"h-80"}/>;
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
        // setOpen(false);
        // setRecharge(true);
        reset();
        setResponse(response)
        setScreen(2);
      })
      .catch((error) => {
        showToast("No se realizó la recarga", error.response.data.message,
          4000, "warning");
        setLoading(false);
      })
  }

  const getSuppliers = async () => {
    try {
      const data = await Recharge.getSuppliers()
      setOperators(data)
    } catch (error) {
      console.error("Error cargando operadores:", error)
    }
  }


  return <>
    {screen == 1 && (
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
            type="submit"
            className="px-4 py-2 text-sm bg-[#008893] cursor-pointer text-white rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    )}
    {screen == 2 && (
      <Voucher phoneNumber={response.phone_number} operatorName={response.operator_name} amount={response.amount}
               status={response.status} ticket={response.ticket} createdAt={response.created_at}/>
    )}
  </>
}