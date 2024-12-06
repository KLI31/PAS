import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { registerAdmin } from "@/functions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/Alert";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const showNotification = (duration = 2000) => {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, duration);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const adminRegister = await registerAdmin(
        formData.nombre,
        formData.correo,
        formData.contraseña
      );
      if (adminRegister) {
        showNotification();
        setTimeout(() => {
          navigation("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error al registrar administrador:", error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <div className="mx-auto w-full max-w-sm">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Crea tu cuenta admin</h1>
            <p className="text-gray-500">
              Escribe los detalles abajo para crear tu cuenta admin
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                placeholder="John Doe"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo">Correo</Label>
              <Input
                id="correo"
                placeholder="name@example.com"
                type="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contraseña">Contraseña</Label>
              <Input
                id="contraseña"
                type="password"
                required
                placeholder="********"
                onChange={handleChange}
              />
            </div>
            <Button className="w-full" type="submit">
              Registarse
            </Button>
          </form>
          <div className="text-center text-sm">
            Ya tienes una cuenta?{" "}
            <Link
              to="/"
              className="text-black font-normal cursor-pointer relative no-underline hover:no-underline after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-current after:bottom-[-2px] after:left-0 after:transform after:scale-x-0 after:transition-all after:ease-in-out after:duration-300 hover:after:scale-x-100"
            >
              Iniciar sesion
            </Link>
          </div>
        </div>
      </div>
      <Alert
        text="Te has resgistrado correctamente"
        isOpen={isOpen}
        description="Ya puedes usar tu cuenta como un administrador "
      />
    </div>
  );
};

export default Register;
