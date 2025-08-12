"use client";
import './login.scss';
import * as yup from "yup";
import {ObjectSchema} from "yup";
import {LoginInterface} from "@/app/(protected-login)/login/login.interface";
import {yupResolver} from "@hookform/resolvers/yup";
import {SubmitHandler, useForm} from "react-hook-form";
import {Auth} from "@/services/auth";
import {useRouter} from "next/navigation";
import {setItem} from "@/services/storage";
import {useState} from "react";
import Loader from "@/components/Loader";
import {showToast} from "@/services/alert";
import {Lock} from "lucide-react";

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
      router.push("/recharge");
      showToast("Inicio de sesión exitoso", "¡Bienvenido de nuevo! Has iniciado sesión correctamente.",
        2000, "success");
    } else {
      showToast("Error de inicio de sesión", "Usuario o contraseña incorrectos. Por favor verifica tus credenciales.",
        2000, "error")
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 bg-[#19949D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold font-sans">Portal Transaccional</h1>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold font-sans leading-tight mb-4">Bienvenido a su portal transaccional</h2>
              <p className="text-[#ccecef] text-lg leading-relaxed">
                Gestione sus operaciones de forma segura y eficiente. Acceda a todas sus herramientas financieras en un
                solo lugar.
              </p>
            </div>
            <div className="flex items-center space-x-4 pt-8">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-[#ccecef]">
                <p className="font-medium">+1,200 usuarios activos</p>
                <p>confiando en nuestra plataforma</p>
              </div>
            </div>
          </div>
          <div className="text-[#99d9df] text-sm">
            <p>© 2025 Portal Transaccional. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-[#e6f6f7] to-white">
        <div className="w-full max-w-md">
          <div className="container-form-login">
            <div className="lock-icon">
              <Lock className="w-6 h-6"/>
            </div>
            <h1 className="title-login">Inicie sesión</h1>
            <h5 className="subtitle-login">Acceda a su cuenta para gestionar sus operaciones</h5>
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
      </div>
    </div>
  );
}