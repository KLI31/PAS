import { Input } from "./ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "./ui/select";
import { DatePicker } from "./DatePicker";
import supabase from "../../supabase";
import { toast } from "sonner";

const initialState = {
  nombre: "",
  apellido: "",
  fecha_ingreso: null,
  dispositivo_asignado: "",
};

const ModalAddWaiters = () => {
  const [waiterData, setWaiterData] = useState(initialState);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    setWaiterData({ ...waiterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, apellido, fecha_ingreso, dispositivo_asignado } =
      waiterData;

    if (!nombre || !apellido || !fecha_ingreso || !dispositivo_asignado) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      const { data: existingWaiter, error: checkError } = await supabase
        .from("meseros")
        .select("*")
        .eq("dispositivo_asignado", parseInt(dispositivo_asignado))
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error al verificar el dispositivo:", checkError.message);
        toast.error("Hubo un error al verificar el dispositivo.");
        return;
      }

      if (existingWaiter) {
        toast.error(
          `El dispositivo ${dispositivo_asignado} ya está asignado a ${existingWaiter.nombre} ${existingWaiter.apellido}.`
        );
        return;
      }

      const { data, error } = await supabase.from("meseros").insert([
        {
          nombre,
          apellido,
          fecha_ingreso,
          dispositivo_asignado: parseInt(dispositivo_asignado),
          veces_presionadas: 0,
          pago_total: 0.0,
        },
      ]);

      if (error) {
        console.error("Error al crear el mesero:", error.message);
        toast.error("Hubo un error al crear el mesero.");
        return;
      }

      toast.success("Mesero añadido con éxito.");
      setWaiterData(initialState);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error inesperado:", error.message);
      alert("Ocurrió un error inesperado.");
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost">Añadir un mesero</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añade un mesero</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Llena los campos para añadir un nuevo mesero
        </DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <Label>Ingresa el nombre</Label>
            <Input
              label="Nombre"
              type="text"
              name="nombre"
              value={waiterData.nombre}
              onChange={handleChange}
              placeholder="Nombre del mesero"
            />
            <Label>Ingresa el apellido</Label>
            <Input
              value={waiterData.apellido}
              label="Apellido"
              name="apellido"
              type="text"
              onChange={handleChange}
              placeholder="Apellido del mesero"
            />
            <Label>Ingresa la fecha de ingreso</Label>
            <DatePicker
              value={waiterData.fecha_ingreso}
              onChange={(date) =>
                setWaiterData({
                  ...waiterData,
                  fecha_ingreso: date, // Guardar el objeto Date
                })
              }
            />
            <Label>Dispositivos activos</Label>
            <Select
              onValueChange={(value) =>
                setWaiterData({ ...waiterData, dispositivo_asignado: value })
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder="Selecciona un dispositivo"
                  defaultValue={""}
                />
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">Dispositivo 1</SelectItem>
                    <SelectItem value="2">Dispositivo 2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Añadir</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddWaiters;
