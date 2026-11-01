import { useEffect, useState } from "react";

export interface Assistant {
  id: string;
  name: string;
  type: string;
  number: string;
  direction?: "inbound" | "outbound";
}

interface VoiceSession {
  id: string;
  config: unknown;
  metadata: unknown;
}

const apiUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

function findString(source: unknown, keys: string[]): string | undefined {
  if (!source || typeof source !== "object") return undefined;
  for (const [key, value] of Object.entries(source)) {
    if (keys.includes(key.toLowerCase()) && typeof value === "string" && value.trim()) {
      return value.trim();
    }
    const nested = findString(value, keys);
    if (nested) return nested;
  }
  return undefined;
}

function mapSession(session: VoiceSession): Assistant | null {
  const source = { config: session.config, metadata: session.metadata };
  const name = findString(source, ["name", "assistant_name", "assistantname", "agent_name", "agentname"]);
  const number = findString(source, ["number", "phone", "phone_number", "phonenumber", "phone_number_value"]);
  const direction = findString(source, ["direction", "call_direction", "type"]);

  if (!name || !number) return null;

  return {
    id: session.id,
    name,
    number,
    type: "Voice assistant",
    direction: direction === "inbound" || direction === "outbound" ? direction : undefined,
  };
}

export function useAssistants(direction: "inbound" | "outbound") {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAssistants() {
      if (!apiUrl || !publishableKey) {
        setError("Supabase configuration is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/rest/v1/voice_sessions?select=id,config,metadata&order=created_at.desc`, {
          headers: {
            apikey: publishableKey,
            Authorization: `Bearer ${publishableKey}`,
          },
        });
        if (!response.ok) throw new Error(`Supabase request failed (${response.status}).`);

        const sessions = (await response.json()) as VoiceSession[];
        const mapped = sessions
          .map(mapSession)
          .filter((assistant): assistant is Assistant => Boolean(assistant))
          .filter((assistant) => !assistant.direction || assistant.direction === direction);

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
