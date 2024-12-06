import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthContext from "@/hooks/useContext";
import ModalAddWaiters from "./ModalAddWaiters";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-semibold">
          <span>Bienvenido {user.nombre}</span>
        </div>
      </div>
      <nav className="flex-1">
        <ul className="flex items-center gap-4 text-sm">
          <li>
            <ModalAddWaiters />
          </li>
          <li>
            <Link to="/history">
              <Button variant="ghost">Historial meseros</Button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
            >
              <img
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
