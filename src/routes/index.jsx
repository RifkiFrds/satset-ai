import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layouts from "../layouts";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Layouts /> } >
          <Route path="/" element={<HomePage />} />
        </Route>
        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
