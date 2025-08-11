import './login.css';
export default function LoginPage(){

    return (
        <div className="login-container">
            <h1>Iniciar sesión</h1>
            <form >
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    required
                />

                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}