import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, User, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageFrame } from "@/components/wedding/PageFrame";
import { Divider } from "@/components/wedding/Ornament";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/tasdiqlash")({
  head: () => ({
    meta: [
      { title: "Mehmon tasdiqlash · Otabek & Kumush" },
      {
        name: "description",
        content: "To'y marosimida ishtirokingizni tasdiqlash uchun qisqa anketani to'ldiring.",
      },
      { property: "og:title", content: "Mehmon tasdiqlash · Otabek & Kumush" },
      { property: "og:description", content: "Iltimos, ishtirokingizni bizga ma'lum qiling." },
    ],
  }),
  component: TasdiqlashPage,
});

const fieldClass =
  "w-full rounded-xl border border-gold-deep/50 bg-paper px-10 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-gold/50";

function TasdiqlashPage() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [attend, setAttend] = useState("yes");
  const [count, setCount] = useState("");
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("thanks"));
    setName("");
    setCount("");
    setNote("");
  };

  return (
    <PageFrame nextTo="/xayr">
      <div className="flex-1 animate-rise">
        <div className="paper-card rounded-[2rem] px-5 py-7">
          <h1 className="text-center font-display text-2xl leading-tight tracking-[0.15em] text-ink">
            {t("rsvpTitle")}
          </h1>
          <p className="mt-3 text-center font-display text-lg text-ink-soft">{t("rsvpSub")}</p>
          <Divider className="mt-4 text-ink" />

          <form className="mt-6 space-y-3" onSubmit={submit}>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-ink-soft" />
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("name")}
                className={fieldClass}
              />
            </div>

            <div className="relative">
              <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-ink-soft" />
              <select
                value={attend}
                onChange={(e) => setAttend(e.target.value)}
                className={`${fieldClass} appearance-none pl-4`}
              >
                <option value="yes">{t("coming")}</option>
                <option value="no">{t("notComing")}</option>
              </select>
            </div>

            <div className="relative">
              <Users className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-ink-soft" />
              <input
                type="number"
                min={1}
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder={t("guests")}
                className={fieldClass}
              />
            </div>

            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("note")}
              className={`${fieldClass} resize-none pl-4`}
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-night py-3 text-sm tracking-wide text-gold transition-colors hover:bg-night-deep"
            >
              {t("send")}
            </button>
          </form>
        </div>
      </div>
    </PageFrame>
  );
}