import React from "react";
import AppRoutes from "./routes/index";
import InstallBanner from "./components/InstallBanner";

function App() {
  return (
    <>
      <AppRoutes />
      <InstallBanner />
    </>
  );
}

export default App;
