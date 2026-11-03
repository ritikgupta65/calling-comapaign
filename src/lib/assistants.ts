import { useEffect, useState } from "react";

export interface Assistant {
  id: string;
  name: string;
  type: string;
  number: string;
  direction?: "inbound" | "outbound";
}

interface DatabaseAssistant {
  id: string;
  name: string;
  user_id: string;
}

const apiUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
const assistantsUserId = import.meta.env.VITE_ASSISTANTS_USER_ID as string | undefined;
const assistantPhoneNumber = import.meta.env.VITE_ASSISTANT_PHONE_NUMBER as string | undefined;

function mapAssistant(assistant: DatabaseAssistant): Assistant {
  return {
    id: assistant.id,
    name: assistant.name,
    number: assistantPhoneNumber ?? "",
    type: "Mobile number",
  };
}

export function useAssistants(direction: "inbound" | "outbound") {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAssistants() {
      if (!apiUrl || !publishableKey || !assistantsUserId) {
        setError("Supabase assistant configuration is missing.");
        setLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams({
          select: "id,name,user_id",
          user_id: `eq.${assistantsUserId}`,
          order: "name.asc",
        });
        const response = await fetch(`${apiUrl}/rest/v1/assistants?${params.toString()}`, {
          headers: {
            apikey: publishableKey,
            Authorization: `Bearer ${publishableKey}`,
          },
        });
        if (!response.ok) throw new Error(`Supabase request failed (${response.status}).`);

        const databaseAssistants = (await response.json()) as DatabaseAssistant[];
        const mapped = databaseAssistants.map(mapAssistant);

        if (!cancelled) setAssistants(mapped);
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load assistants.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadAssistants();
    return () => {
      cancelled = true;
    };
  }, [direction]);

  return { assistants, loading, error };
}
