import {Lock} from "lucide-react";
import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginInterface} from "@/app/(protected-login)/login/login.interface";
import {Auth} from "@/services/auth";
import {setItem} from "@/services/storage";
import {showToast} from "@/services/alert";
import * as yup from "yup";
import {ObjectSchema} from "yup";

const schema: ObjectSchema<LoginInterface> = yup.object({
  username: yup.string().required('El nombre de usuario es obligatorio'),
  user_password: yup.string().required('La contraseña es obligatoria'),
})

type Props = { setLoading: (v: boolean) => void };

export default function LoginForm({setLoading}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm(
    {resolver: yupResolver(schema),}
  );

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
  return <>
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
  </>
}