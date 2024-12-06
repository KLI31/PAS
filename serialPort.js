import { SerialPort } from "serialport";

SerialPort.list()
  .then((ports) => {
    console.log("Puertos disponibles:");
    ports.forEach((port) => {
      console.log(`Puerto: ${port.path}`);
      console.log(`Fabricante: ${port.manufacturer || "Desconocido"}`);
    });
  })
  .catch((err) => {
    console.error("Error al listar puertos:", err.message);
  });
