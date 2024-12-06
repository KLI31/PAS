import { SerialPort, ReadlineParser } from "serialport";
import {
  manejarPresionTecla,
  actualizarEstadoDispositivo,
} from "./supabase.js";

let arduinoPort = null;
let parser = null;
let connected = false;
let connecting = false;

async function conectarArduino() {
  try {
    const puertoArduino = await detectarArduino();
    console.log(`[INFO] Intentando conectar al puerto: ${puertoArduino}`);

    arduinoPort = new SerialPort({
      path: puertoArduino,
      baudRate: 9600,
    });

    arduinoPort.on("error", (err) => {
      console.error("[ERROR] Error en puerto serial:", err.message);
      connected = false;
    });

    parser = new ReadlineParser({ delimiter: "\r\n" });
    arduinoPort.pipe(parser);

    parser.on("data", async (data) => {
      const mensaje = data.trim();
      console.log(`[INFO] Mensaje recibido: ${mensaje}`);

      const numeroExtraido = mensaje.match(/\d+/);
      if (numeroExtraido) {
        const tecla = parseInt(numeroExtraido[0]);
        console.log(`[INFO] Tecla reconocida: ${tecla}`);

        try {
          await actualizarEstadoDispositivo(tecla);
          await manejarPresionTecla(tecla);
        } catch (error) {
          console.error("[ERROR] Error al procesar tecla:", error.message);
        }
      } else {
        console.warn(`[WARN] Mensaje no reconocido: ${mensaje}`);
      }
    });

    arduinoPort.on("close", () => {
      console.warn("[WARN] El puerto serial se cerró.");
      connected = false;
    });

    connected = true;
    console.log("[INFO] Arduino conectado correctamente.");
  } catch (err) {
    console.error(`[ERROR] Error al conectar al Arduino: ${err.message}`);
    connected = false;
  } finally {
    connecting = false;
  }
}

async function detectarArduino() {
  const ports = await SerialPort.list();
  console.log("[INFO] Puertos disponibles:", ports);

  const arduino = ports.find(
    (port) =>
      port.manufacturer?.toLowerCase().includes("arduino") ||
      port.manufacturer?.toLowerCase().includes("wch.cn")
  );

  if (!arduino) {
    throw new Error("No se encontró ningún Arduino conectado.");
  }

  return arduino.path;
}

function iniciarMonitorConexion() {
  setInterval(() => {
    if (!connected && !connecting) {
      console.log("[INFO] Intentando conectar al Arduino...");
      connecting = true;
      conectarArduino();
    }
  }, 5000); // Intenta cada 5 segundos
}

// Iniciar el monitor de conexión
iniciarMonitorConexion();

export { arduinoPort };
