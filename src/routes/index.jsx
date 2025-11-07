import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import ContributorPage from "../pages/ContributorPage";
import ChatBotPage from "../components/features/chat-bot-ai";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <MainLayout /> } >
          <Route path="/" element={<HomePage />} />
          <Route path="/contributor" element={<ContributorPage />} />
          <Route path="/features/chat-bot-ai" element={<ChatBotPage />} />
          {/* <Route path="/features/jurnal-ai" element={<JurnalAIPage />} /> */}

        </Route>
        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
