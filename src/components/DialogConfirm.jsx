import { Clock1, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DialogConfirm = ({
  open,
  onOpenChange,
  onConfirm,
  itemName,
  textConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {textConfirm === "Eliminar" ? (
              <Trash2 className="h-5 w-5 text-destructive" />
            ) : (
              <Clock1 className="h-5 w-5 text-primary" />
            )}
            {textConfirm}
          </DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres {textConfirm} a {itemName}? Esta acción
            no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className={`flex items-center gap-2`}
          >
            {textConfirm === "Eliminar" ? (
              <Trash2 className="h-4 w-4" />
            ) : (
              <Clock1 className="h-4 w-4" />
            )}
            {textConfirm}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirm;
