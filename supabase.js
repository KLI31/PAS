// import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gwqfxrwfvyeemleislen.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3cWZ4cndmdnllZW1sZWlzbGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NjMzMDYsImV4cCI6MjA0ODEzOTMwNn0.9c8LRxUUCuibePM1GpOnEO0jT6Jo74HOOys9_PP0hrQ";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function manejarPresionTecla(tecla) {
  try {
    // Asegúrate de que 'tecla' sea un número
    const dispositivoId = parseInt(tecla);

    const { data: mesero, error: meseroError } = await supabase
      .from("meseros")
      .select("*")
      .eq("dispositivo_asignado", dispositivoId)
      .single();

    console.log(mesero);

    if (meseroError || !mesero) {
      console.warn(
        `[DEBUG] No se encontró un mesero para el dispositivo: ${dispositivoId}`
      );
      return;
    }

    console.log(`[DEBUG] Mesero encontrado: ${mesero.nombre}`);

    const nuevasVecesPresionadas = mesero.veces_presionadas + 1;
    const nuevoPagoTotal = nuevasVecesPresionadas * 700;

    const { error: updateError } = await supabase
      .from("meseros")
      .update({
        veces_presionadas: nuevasVecesPresionadas,
        pago_total: nuevoPagoTotal,
      })
      .eq("id", mesero.id);

    if (updateError) {
      console.error(
        "[ERROR] Error al actualizar mesero en Supabase:",
        updateError.message
      );
    } else {
      console.log("[DEBUG] Mesero actualizado correctamente.");
    }
  } catch (err) {
    console.error("[ERROR] Fallo al manejar presión de tecla:", err.message);
  }
}

async function actualizarEstadoDispositivo(dispositivoId) {
  try {
    const { data: dispositivoActual, error: fetchError } = await supabase
      .from("dispositivos")
      .select("*")
      .eq("id", dispositivoId)
      .maybeSingle();

    if (fetchError) {
      console.error(
        "[ERROR] Error al obtener el dispositivo:",
        fetchError.message
      );
      return;
    }

    // Luego, realiza la actualización
    const nuevasPresiones = dispositivoActual.conteo_presiones
      ? dispositivoActual.conteo_presiones + 1
      : 1;

    const { error: updateError } = await supabase
      .from("dispositivos")
      .update({ estado: true, conteo_presiones: nuevasPresiones })
      .eq("id", dispositivoActual.id);

    if (updateError) {
      console.error(
        "[ERROR] Error al actualizar el dispositivo:",
        updateError.message
      );
    }
  } catch (err) {
    console.error("[ERROR] Excepción al manejar el dispositivo:", err.message);
  }
}

export { actualizarEstadoDispositivo };

export default supabase;
