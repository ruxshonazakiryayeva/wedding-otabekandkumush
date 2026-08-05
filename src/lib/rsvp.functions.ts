import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const adminSchema = z.object({ password: z.string().min(1).max(64) });

export const listRsvps = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => adminSchema.parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PANEL_PASSWORD"];
    if (!expected || data.password !== expected) {
      return { ok: false as const, rows: [] };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("rsvps")
      .select("id, name, attending, guests, note, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { ok: true as const, rows: rows ?? [] };
  });
