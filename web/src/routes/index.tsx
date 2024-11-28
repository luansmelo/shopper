import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import TravelHistory from "../pages/TravelHistory";
import RideConfirmPage from "../pages/RideConfirm";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/opcoes-de-viagem" element={<RideConfirmPage />} />
        <Route path="/historico-viagens" element={<TravelHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export { Router };
