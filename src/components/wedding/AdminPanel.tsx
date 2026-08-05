import { useState } from "react";
import { KeyRound, Loader2, Users } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

type RsvpRow = {
  id: string;
  name: string;
  attending: boolean;
  guests: number;
  note: string | null;
  created_at: string;
};

const ADMIN_PASSWORD = "1317";

export function AdminPanel() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rows, setRows] = useState<RsvpRow[] | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setFailed(false);
    setErrorMessage(null);

    if (password !== ADMIN_PASSWORD) {
      setFailed(true);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("rsvps")
      .select("id, name, attending, guests, note, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setFailed(true);
      setErrorMessage(error.message);
    } else {
      setRows((data ?? []) as RsvpRow[]);
    }
    setLoading(false);
  };

  const close = () => {
    setOpen(false);
    setPassword("");
    setRows(null);
    setFailed(false);
    setErrorMessage(null);
  };

  const attending = rows?.filter((r) => r.attending) ?? [];
  const people = attending.reduce((sum, r) => sum + (r.guests || 0), 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("adminTitle")}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold/70 transition-colors hover:text-gold"
      >
        <KeyRound className="h-4 w-4" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night-deep/80 p-4 backdrop-blur"
          onClick={close}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gold/40 bg-night p-5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-xl tracking-widest text-gold">
              {rows ? t("guestList") : t("adminTitle")}
            </h2>

            {rows ? (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gold/80">
                  <Users className="h-4 w-4" />
                  {t("total")}: {rows.length} {t("answers")} · {t("willCome")}: {attending.length} ·{" "}
                  {t("peopleCount")}: {people}
                </div>
                {rows.length === 0 ? (
                  <p className="text-sm text-foreground/60">{t("noAnswers")}</p>
                ) : null}
                <ul className="space-y-2">
                  {rows.map((row) => (
                    <li key={row.id} className="rounded-xl border border-gold/25 bg-night-deep/60 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-display text-lg text-foreground">{row.name}</p>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                            row.attending ? "bg-gold/20 text-gold" : "bg-rose/20 text-rose"
                          }`}
                        >
                          {row.attending ? t("coming") : t("notComing")}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-foreground/60">
                        {t("peopleCount")}: {row.guests}
                        {row.note ? ` · ${row.note}` : ""}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <form className="mt-4 space-y-3" onSubmit={submit}>
                <p className="text-sm text-foreground/70">{t("password")}</p>
                <input
                  type="password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gold/40 bg-night-deep px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/40"
                  placeholder="••••"
                />
                {failed ? (
                  <p className="text-sm text-rose">
                    {errorMessage ? `${t("wrongPassword")}: ${errorMessage}` : t("wrongPassword")}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={loading || !password}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/50 bg-night-deep py-3 text-sm tracking-wide text-gold disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {t("enter")}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
