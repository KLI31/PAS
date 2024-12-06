import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import HistoryTable from "@/components/HistoryTable";

const History = () => {
  let history = useNavigate();

  return (
    <div className="p-2">
      <Button variant="ghost" onClick={() => history(-1)}>
        <ArrowLeftIcon />
        Regresar al dashboard
      </Button>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="mb-5">
            <h1 className="text-3xl font-bold">
              Historial de meseros - Crispy Chips
            </h1>
            <p className="text-1xl text-gray-500">
              Accede al historial de tus meseros
            </p>
          </div>
        </div>
        <HistoryTable />
      </main>
    </div>
  );
};

export default History;
