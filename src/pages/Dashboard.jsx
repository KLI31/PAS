import useAuthContext from "@/hooks/useContext";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import TableWaiters from "@/components/TableWaiters";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const { waiters, loadActiveWaiters } = useAuthContext();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    loadActiveWaiters();
  }, [waiters]);

  const isEmpty = useMemo(() => waiters.length === 0, [waiters]);

  return (
    <div className="overflow-y-hidden">
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />
        <main className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <div className="mb-5">
              <h1 className="text-3xl font-bold">
                Panel Crispy Chips - Dispositivos IoT
              </h1>
              <p className="text-1xl text-gray-500">
                Accede a la informacion de tus meseros
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">{currentDate}</Button>
            </div>
          </div>
          {isEmpty ? (
            <h2 className="text-center font-semibold text-2xl">
              No tienes meseros registrados
            </h2>
          ) : (
            <TableWaiters />
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
