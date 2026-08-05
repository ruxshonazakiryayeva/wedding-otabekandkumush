import { useServerFn } from "@tanstack/react-start";
import { KeyRound, Loader2, Users } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { listRsvps } from "@/lib/rsvp.functions";

type Rsvp = {
  id: string;
  name: string;
  attending: boolean;
  guests: number;
  note: string | null;
  created_at: string;
};

export function AdminPanel() {
  const fetchRsvps = useServerFn(listRsvps);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rows, setRows] = useState<Rsvp[] | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetchRsvps({ data: { password } });
      if (!res.ok) {
        setError(true);
      } else {
        setRows(res.rows as Rsvp[]);
      }
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  const close = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setPassword("");
      setRows(null);
      setError(false);
    }
  };

  const coming = rows?.filter((r) => r.attending) ?? [];
  const totalGuests = coming.reduce((s, r) => s + (r.guests || 0), 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Admin panel"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold/70 transition-colors hover:text-gold"
      >
        <KeyRound className="h-4 w-4" />
      </button>

      <Dialog open={open} onOpenChange={close}>
        <DialogContent className="max-h-[85vh] overflow-y-auto border-gold/40 bg-night text-foreground sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display tracking-widest text-gold">
              {rows ? "MEHMONLAR RO'YXATI" : "ADMIN PANEL"}
            </DialogTitle>
          </DialogHeader>

          {!rows ? (
            <form className="space-y-3" onSubmit={submit}>
              <p className="text-sm text-foreground/70">Parolni kiriting</p>
              <input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gold/40 bg-night-deep px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/40"
                placeholder="••••"
              />
              {error && <p className="text-sm text-rose">Parol xato</p>}
              <button
                type="submit"
                disabled={loading || !password}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gold/50 bg-night-deep py-3 text-sm tracking-wide text-gold disabled:opacity-50"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Kirish
              </button>
            </form>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gold/80">
                <Users className="h-4 w-4" />
                Jami: {rows.length} javob · Keladi: {coming.length} · Odamlar soni: {totalGuests}
              </div>
              {rows.length === 0 && (
                <p className="text-sm text-foreground/60">Hozircha javoblar yo'q.</p>
              )}
              <ul className="space-y-2">
                {rows.map((r) => (
                  <li
                    key={r.id}
                    className="rounded-xl border border-gold/25 bg-night-deep/60 px-4 py-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-display text-lg text-foreground">{r.name}</p>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                          r.attending ? "bg-gold/20 text-gold" : "bg-rose/20 text-rose"
                        }`}
                      >
                        {r.attending ? "Kelaman" : "Kelolmayman"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-foreground/60">
                      Odamlar soni: {r.guests}
                      {r.note ? ` · ${r.note}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
