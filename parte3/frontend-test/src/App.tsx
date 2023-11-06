import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GruposProvider } from "./contexts/GruposContext";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Grupos from "./pages/Grupos";
import Cadastro from "./pages/Cadastro";
import Grupo from "./pages/Grupo";
import PaginaNaoEncontrada from "./pages/PaginaNaoEncontrada";

function App() {
  return (
    <GruposProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="grupos" element={<Grupos />}>
              <Route path=":id" element={<Grupo />} />
            </Route>
            <Route path="cadastro" element={<Cadastro />} />
            <Route path="*" element={<PaginaNaoEncontrada />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GruposProvider>
  );
}

export default App;
