import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuthContext from "@/hooks/useContext";
import { DatePicker } from "./DatePicker";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HistoryTable = () => {
  const { closedWaiters } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filteredWaiters = closedWaiters.filter((waiter) => {
    const matchesName =
      waiter.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      waiter.apellido.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate =
      (!startDate || new Date(waiter.fecha_cierre) >= new Date(startDate)) &&
      (!endDate || new Date(waiter.fecha_cierre) <= new Date(endDate));

    return matchesName && matchesDate;
  });

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-4 mb-10">
        <Input
          placeholder="Buscar por nombre o apellido"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />

        <DatePicker value={startDate} onChange={(date) => setStartDate(date)} />

        <DatePicker value={endDate} onChange={(date) => setEndDate(date)} />

        <Button
          variant="secondary"
          onClick={() => {
            setSearchTerm("");
            setStartDate(null);
            setEndDate(null);
          }}
        >
          Limpiar filtros
        </Button>
      </div>

      {/* Mostrar mensaje si no hay resultados */}
      {filteredWaiters.length === 0 ? (
        <h2 className="text-center font-semibold text-2xl">
          No se encontro ningun mesero
        </h2>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del mesero</TableHead>
              <TableHead>Apellido del mesero</TableHead>
              <TableHead>Fecha de cierre</TableHead>
              <TableHead>Veces que se presionó</TableHead>
              <TableHead>Comisiones del día</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWaiters.map((waiter) => (
              <TableRow key={waiter.id}>
                <TableCell>{waiter.nombre}</TableCell>
                <TableCell>{waiter.apellido}</TableCell>
                <TableCell>{waiter.fecha_cierre}</TableCell>
                <TableCell>{waiter.veces_presionadas}</TableCell>
                <TableCell>${waiter.pago_total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default HistoryTable;
