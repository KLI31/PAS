import supabase from "../../supabase";

export const registerAdmin = async (nombre, correo, contraseña) => {
  try {
    const { data, error } = await supabase
      .from("administradores")
      .insert([
        {
          nombre: nombre,
          correo: correo,
          contraseña: contraseña,
        },
      ])
      .select();

    if (error) {
      throw new Error(`Error al registrar administrador: ${error.message}`);
    }

    console.log("Datos insertados correctamente:", data);

    return data;
  } catch (error) {
    console.error("Error en registerAdmin:", error.message);
  }
};

export const loginAdmin = async (correo, contraseña) => {
  try {
    const { data, error } = await supabase
      .from("administradores")
      .select("*")
      .eq("correo", correo)
      .eq("contraseña", contraseña)
      .single();

    if (error) {
      console.error("Error en Supabase:", error.message);
      throw new Error("Credenciales incorrectas.");
    }

    const { contraseña: _, ...adminData } = data;

    return adminData;
  } catch (error) {
    console.error("Error inesperado:", error.message);
    return null;
  }
};

export const fetchWaiters = async () => {
  try {
    const { data: waitersData, error } = await supabase
      .from("meseros")
      .select("*");

    if (error) {
      console.error("Error al obtener meseros:", error.message);
      return { activeWaiters: [], closedWaiters: [] };
    }

    const { data: historialData, error: historialError } = await supabase
      .from("historial_meseros")
      .select("*");

    if (historialError) {
      console.error("Error al obtener historial:", historialError.message);
      return { activeWaiters: [], closedWaiters: [] };
    }

    return { activeWaiters: waitersData, closedWaiters: historialData };
  } catch (error) {
    console.error("Error en fetchWaiters:", error.message);
    return { activeWaiters: [], closedWaiters: [] };
  }
};

export const deleteWaiter = async (waiterId) => {
  try {
    const { error } = await supabase
      .from("meseros")
      .delete()
      .eq("id", waiterId);
    if (error) {
      console.error("[ERROR] Error al eliminar el mesero:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[ERROR] Error general al eliminar mesero:", err.message);
    return false;
  }
};

export const closeTurnWaiter = async (waiterId) => {
  console.log(
    "[DEBUG] ID que se usará en la consulta:",
    waiterId,
    "Tipo:",
    typeof waiterId
  );

  try {
    // Verificar si el ID es válido
    if (!waiterId) {
      console.error("[ERROR] ID no válido:", waiterId);
      return false;
    }

    // Buscar el mesero en la tabla
    const { data: waiter, error: waiterError } = await supabase
      .from("meseros")
      .select("*")
      .eq("id", waiterId)
      .single();

    if (waiterError || !waiter) {
      console.error("[ERROR] ID del mesero no encontrado:", waiterId);
      return false;
    }

    // Mover mesero al historial
    const { error: insertError } = await supabase
      .from("historial_meseros")
      .insert([
        {
          mesero_id: waiter.id,
          nombre: waiter.nombre,
          apellido: waiter.apellido,
          fecha_cierre: new Date().toISOString().split("T")[0],
          veces_presionadas: waiter.veces_presionadas,
          pago_total: waiter.pago_total,
        },
      ]);

    if (insertError) {
      console.error(
        "[ERROR] Error al mover mesero al historial:",
        insertError.message
      );
      return false;
    }

    // Eliminar mesero de la tabla `meseros`
    const { error: deleteError } = await supabase
      .from("meseros")
      .delete()
      .eq("id", waiterId);

    if (deleteError) {
      console.error("[ERROR] Error al eliminar mesero:", deleteError.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[ERROR] Fallo inesperado al cerrar turno:", err.message);
    return false;
  }
};
