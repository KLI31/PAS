import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useAuthContext from "@/hooks/useContext";
import DialogConfirm from "./DialogConfirm";
import { LogOut, Trash2 } from "lucide-react";

const TableWaiters = () => {
  const [selectedWaiter, setSelectedWaiter] = useState(null);
  const [waiterToDelete, setWaiterToDelete] = useState(null);
  const [waiterToCloseTurn, setWaiterToCloseTurn] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const [isDialogCloseTurnOpen, setIsDialogCloseTurnOpen] = useState(false);

  const { handleDelete, waiters, handleCloseTurn } = useAuthContext();

  const handleMoreInfo = (waiter) => {
    setSelectedWaiter(waiter);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedWaiter(null);
    setIsDialogOpen(false);
  };

  const handleDeleteWaiter = (waiter) => {
    setWaiterToDelete(waiter);
    setIsDialogDeleteOpen(true);
  };

  const handleCloseTurnDialog = (waiter) => {
    setWaiterToCloseTurn(waiter);
    setIsDialogCloseTurnOpen(true);
  };

  const confirmCloseTurn = () => {
    if (waiterToCloseTurn) {
      handleCloseTurn(waiterToCloseTurn); // Lógica para cerrar turno
      setWaiterToCloseTurn(null);
      setIsDialogCloseTurnOpen(false);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre del mesero</TableHead>
            <TableHead>Fecha ingreso</TableHead>
            <TableHead>Información</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {waiters.map((waiter) => (
            <TableRow key={waiter.id}>
              <TableCell>{waiter.nombre}</TableCell>
              <TableCell>{waiter.fecha_ingreso}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => handleMoreInfo(waiter)}
                >
                  Más información
                </Button>
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Button
                  onClick={() => handleDeleteWaiter(waiter)}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar mesero
                </Button>
                <Button
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={() => handleCloseTurnDialog(waiter)}
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar turno
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmación de eliminar mesero */}
      <DialogConfirm
        open={isDialogDeleteOpen}
        onConfirm={() => {
          handleDelete(waiterToDelete.id);
          setWaiterToDelete(null);
        }}
        onOpenChange={(isOpen) => {
          setIsDialogDeleteOpen(isOpen);
          if (!isOpen) setWaiterToDelete(null);
        }}
        itemName={waiterToDelete?.nombre}
        textConfirm="Eliminar"
      />

      {/* Confirmación de cerrar turno */}
      <DialogConfirm
        open={isDialogCloseTurnOpen}
        onConfirm={confirmCloseTurn}
        onOpenChange={(isOpen) => {
          setIsDialogCloseTurnOpen(isOpen);
          if (!isOpen) setWaiterToCloseTurn(null);
        }}
        itemName={waiterToCloseTurn?.nombre}
        textConfirm="Cerrar turno"
      />

      {/* Información del mesero */}
      {selectedWaiter && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Información del Mesero</DialogTitle>
              <DialogDescription>
                Aquí tienes la información del mesero
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <dl className="space-y-4">
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Nombre:
                      </dt>
                      <dd className="font-semibold">{selectedWaiter.nombre}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Apellido:
                      </dt>
                      <dd className="font-semibold">
                        {selectedWaiter.apellido}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Fecha de ingreso:
                      </dt>
                      <dd className="font-semibold">
                        {selectedWaiter.fecha_ingreso}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Dispositivo asignado:
                      </dt>
                      <dd className="font-semibold">
                        {selectedWaiter.dispositivo_asignado}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-muted-foreground">
                        Veces presionadas:
                      </dt>
                      <dd className="font-semibold">
                        {selectedWaiter.veces_presionadas}
                      </dd>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <dt>Cada presión equivale a 700 pesos</dt>
                    </div>
                    <div className="flex justify-between border-t pt-4">
                      <dt className="text-lg font-medium">Pago total:</dt>
                      <dd className="text-lg font-bold">
                        ${selectedWaiter.pago_total}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TableWaiters;
