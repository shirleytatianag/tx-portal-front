"use client";
import './login.scss';
import * as yup from "yup";
import {ObjectSchema} from "yup";
import {LoginInterface} from "@/app/login/login.interface";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {Auth} from "@/services/auth";
import {useRouter} from "next/navigation";
import {setItem} from "@/services/storage";
import {useState} from "react";
import Loader from "@/components/Loader";

const schema: ObjectSchema<LoginInterface> = yup.object({
  username: yup.string().required('El nombre de usuario es obligatorio'),
  user_password: yup.string().required('La contraseña es obligatoria'),
})

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm(
    {resolver: yupResolver(schema),}
  );

  if (loading) {
    return <Loader/>;
  }

  const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
    setLoading(true);
    const loginRequest = {
      username: data.username,
      user_password: data.user_password
    }

    const res = await Auth.login(loginRequest);

    if (res.token) {
      setItem("token", res.token);
      router.push("/dashboard");
      console.log("✅ Login exitoso");
      setLoading(false);

    } else {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper-login">
      <div className="container-form-login">
        <i className="icon-user"></i>
        <h1 className="title-login">Bienvenido de nuevo</h1>
        <h5 className="subtitle-login">Inicia sesión en el portal transaccional</h5>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label className="form-label">Nombre de usuario</label>
            <input
              {...register("username", {required: true})}
              className={`form-input ${errors.username && 'input-error'}`}
              type="username"
              placeholder="Nombre de usuario"
            />
            {errors.username && (<small className="error">{errors.username.message}</small>)}
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              {...register("user_password", {required: true})}
              className={`form-input ${errors.user_password && 'input-error'}`}
              type="password"
              placeholder="Contraseña"
            />
            {errors.user_password && (<small className="error">{errors.user_password.message}</small>)}
          </div>
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}