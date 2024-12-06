import { loginAdmin } from "@/functions";
import useAuthContext from "@/hooks/useContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: "",
  });

  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const admin = await loginAdmin(formData.correo, formData.contraseña);
      if (admin) {
        login(admin);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 bg-black p-10 lg:block bg">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpg`}
              alt="Crispy Chips Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-lg font-semibold text-white">
              Crispy Chips
            </span>
          </div>
          <div className="space-y-4">
            <blockquote className="text-lg font-medium leading-relaxed text-white">
              Las mejores papas fritas de Medellín, con el sabor auténtico que
              todos aman
            </blockquote>
            <footer className="text-sm text-gray-400">
              Cliente Satisfecho
            </footer>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center flex-col p-8 lg:w-1/2">
        <div className="mx-auto flex w-full max-w-sm flex-col justify-center  space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">
              Inicia sesion como administrador
            </h1>
            <p className="text-gray-500">
              Escribe los detalles abajo para iniciar sesion
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="correo">Correo</Label>
              <Input
                id="correo"
                placeholder="name@example.com"
                name="correo"
                value={formData.correo}
                type="correo"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="contraseña"
                type="password"
                name="contraseña"
                placeholder="Escribe tu contraseña"
                required
                value={formData.contraseña}
                onChange={handleChange}
              />
            </div>
            <Button className="w-full" type="submit">
              Iniciar sesion
            </Button>
          </form>
          <div className="text-center">
            <p className="text-gray-500">
              No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="text-black font-normal cursor-pointer relative no-underline hover:no-underline after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:bottom-[-2px] after:left-0 after:transform after:scale-x-0 after:transition-all after:ease-in-out after:duration-300 hover:after:scale-x-100"
              >
                Registrate aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
