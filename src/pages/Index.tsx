import { useState } from "react";
import Layout from "@/components/Layout";
import Outbound from "./Outbound";
import Inbound from "./Inbound";
import Analytics from "./Analytics";
import Settings from "./Settings";

const Index = () => {
  const [currentMode, setCurrentMode] = useState<"outbound" | "inbound" | "analytics" | "settings">("outbound");

  const renderCurrentPage = () => {
    switch (currentMode) {
      case "outbound":
        return <Outbound />;
      case "inbound":
        return <Inbound />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Outbound />;
    }
  };

  return (
    <Layout currentMode={currentMode} onModeChange={setCurrentMode}>
      {renderCurrentPage()}
    </Layout>
  );
};

export default Index;
