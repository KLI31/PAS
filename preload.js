import dotenv from "dotenv";
import { contextBridge } from "electron";

dotenv.config();
contextBridge.exposeInMainWorld("env", {
  SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  SUPABASE_KEY: process.env.VITE_SUPABASE_KEY,
});
