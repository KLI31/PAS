import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

let mainWindow;
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isDev = process.env.NODE_ENV === "development";

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Prueba para el tema si esta en desarrollo o en produccion
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  }
});

const serialManagerPath = path.join(__dirname, "serialManager.js");
import(serialManagerPath).catch((err) => {
  console.error("Error importing serialManager.js:", err);
});
