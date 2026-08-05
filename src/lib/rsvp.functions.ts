import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const rsvpSchema = z.object({
  name: z.string().trim().min(1).max(120),
  attending: z.boolean(),
  guests: z.number().int().min(1).max(50),
  note: z.string().trim().max(500).optional(),
});

export type RsvpRow = {
  id: string;
  name: string;
  attending: boolean;
  guests: number;
  note: string | null;
  created_at: string;
};

export const submitRsvp = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => rsvpSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("rsvps").insert({
      name: data.name,
      attending: data.attending,
      guests: data.guests,
      note: data.note?.length ? data.note : null,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const listRsvps = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ password: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"] || "1317";
    if (data.password !== expected) {
      return { ok: false as const, rows: [] as RsvpRow[] };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("rsvps")
      .select("id, name, attending, guests, note, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { ok: true as const, rows: (rows ?? []) as RsvpRow[] };
  });
