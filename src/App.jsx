import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Toaster } from "sonner";

// TO-DO
// Terminar el historial de meseros
// Deployar la aplicacion

function App() {
  return (
    <div>
      <Toaster richColors position="top-center" />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
