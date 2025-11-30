import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/routes/Homepage";
import StatePage from "@/routes/StatePage";
import ListPage from "@/routes/ListPage";
import EffectPage from "@/routes/EffectPage";
import FormPage from "@/routes/FormPage";
import ContextPage from "@/routes/ContextPage";
import PerformancePage from "@/routes/PerformancePage";
import ErrorPage from "./routes/ErrorPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/state" element={<StatePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/effect" element={<EffectPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/context" element={<ContextPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
