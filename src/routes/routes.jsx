import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { DesignSystem } from "../components/design-system";

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="design-system" element={<DesignSystem />} />
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  );
}
