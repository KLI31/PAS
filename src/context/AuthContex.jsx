import { createContext, useState } from "react";
import { fetchWaiters, deleteWaiter, closeTurnWaiter } from "@/functions";
import { toast } from "sonner";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [waiters, setWaiters] = useState([]);
  const [closedWaiters, setClosedWaiters] = useState([]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const loadActiveWaiters = async () => {
    const { activeWaiters, closedWaiters } = await fetchWaiters();
    setWaiters(activeWaiters);
    setClosedWaiters(closedWaiters);
  };

  const handleDelete = async (id) => {
    const deleteSuccess = await deleteWaiter(id);
    if (deleteSuccess) {
      setWaiters((prev) => prev.filter((waiter) => waiter.id !== id));
      toast.success("Mesero eliminado con éxito.");
    }
  };

  const handleCloseTurn = async (waiter) => {
    const success = await closeTurnWaiter(waiter.id);
    if (success) {
      setWaiters((prev) => prev.filter((w) => w.id !== waiter.id));
      setClosedWaiters((prev) => [...prev, { ...waiter, turno_cerrado: true }]);
      toast.success("Turno cerrado con éxito.");
    } else {
      console.error("[ERROR] No se pudo cerrar el turno.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        waiters,
        setWaiters,
        handleDelete,
        closedWaiters,
        setClosedWaiters,
        handleCloseTurn,

        loadActiveWaiters,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
