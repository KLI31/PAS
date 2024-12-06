import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export function DatePicker({ value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(value);

  // Sincronizar el estado interno con el valor externo (prop `value`)
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange && onChange(date); // Llama a onChange solo si está definido
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`pl-3 text-left font-normal ${
            !selectedDate ? "text-muted-foreground" : ""
          }`}
        >
          {selectedDate ? (
            format(selectedDate, "PPP")
          ) : (
            <span>Selecciona una fecha</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
