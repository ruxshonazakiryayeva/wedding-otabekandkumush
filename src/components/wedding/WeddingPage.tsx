import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  Loader2,
  MapPin,
  Music2,
  Pause,
} from "lucide-react";

import brideImg from "@/assets/bride.jpg";
import coupleImg from "@/assets/couple.jpg";
import finaleImg from "@/assets/finale.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gardenImg from "@/assets/garden.jpg";
import groomImg from "@/assets/groom.jpg";
import heroImg from "@/assets/hero-night.jpg";

import { LanguageProvider, LANGS, useI18n, type Lang } from "@/lib/i18n";
import { MusicProvider, useMusic } from "@/lib/music";
import { submitRsvp } from "@/lib/rsvp.functions";
import { AdminPanel } from "./AdminPanel";
import { CrownOrnament, Divider } from "./Ornament";
import { Section } from "./Section";
import { StarField } from "./StarField";

const WEDDING_DATE = new Date("2027-07-27T18:00:00+05:00");
const MAP_URL = "https://maps.google.com/?q=Marg'ilon+restorani+Farg'ona";

function TopBar() {
  const { lang, setLang } = useI18n();
  const { playing, toggle } = useMusic();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-gold/15 bg-night-deep/70 backdrop-blur">
      <div className="mx-auto grid max-w-2xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label="music"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
          </button>
          <span className="truncate font-display text-lg tracking-[0.25em] text-gold">O & K</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex overflow-hidden rounded-full border border-gold/40">
            {LANGS.map((code: Lang) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={`px-2.5 py-1 text-xs uppercase tracking-widest transition-colors ${
                  lang === code ? "bg-gold text-night" : "text-gold/70"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function BottomLinks() {
  return (
    <footer className="relative z-10 flex flex-col items-center gap-3 px-6 py-10 text-center">
      <AdminPanel />
      <a
        href="https://webinvite-six.vercel.app/"
        target="_blank"
        rel="noreferrer"
        aria-label="WebInvite"
        className="flex h-10 items-center justify-center rounded-full border border-gold bg-gold px-6 text-sm font-semibold tracking-[0.25em] text-night transition-transform hover:-translate-y-0.5"
      >
        WI
      </a>
    </footer>
  );
}

function ScrollHint({ target }: { target: string }) {
  const { t } = useI18n();
  return (
    <a
      href={`#${target}`}
      className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-1 text-[0.65rem] tracking-[0.35em] text-gold/70"
    >
      {t("down")}
      <ChevronDown className="h-4 w-4 animate-bounce" />
    </a>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <Section id="hero" backgroundImage={heroImg} overlay="soft" className="items-center text-center">
      <CrownOrnament className="mx-auto" />
      <p className="mt-4 text-xs tracking-[0.4em] text-gold/80">{t("heroKicker")}</p>
      <h1 className="mt-6 flex flex-col items-center font-display text-5xl leading-tight text-gold-gradient sm:text-7xl">
        <span>{t("groom")}</span>
        <span className="my-1 text-3xl text-gold/70 sm:my-2">&</span>
        <span>{t("bride")}</span>
      </h1>
      <Divider className="mt-6" />
      <p className="mt-6 font-display text-3xl text-foreground">27.07.2027</p>
      <p className="mt-2 text-sm text-foreground/70">{t("venue")}</p>
      <ScrollHint target="invite" />
    </Section>
  );
}

function Invite() {
  const { t } = useI18n();
  return (
    <Section id="invite" backgroundImage={coupleImg} className="items-center text-center">
      <div className="paper-card rounded-3xl px-6 py-10">
        <p className="text-xs tracking-[0.3em] text-ink-soft">{t("guest")}</p>
        <Divider className="my-5" />
        <p className="font-display text-2xl leading-relaxed text-ink">
          {t("inviteA")} <span className="whitespace-nowrap text-gold-deep">{t("inviteB")}</span> {t("inviteC")}
        </p>
        <div className="mt-6 flex items-center justify-center gap-4 font-display text-3xl text-ink">
          <span>{t("groom")}</span>
          <span className="text-gold-deep">&</span>
          <span>{t("bride")}</span>
        </div>
      </div>
      <ScrollHint target="story" />
    </Section>
  );
}

function Story() {
  const { t } = useI18n();
  return (
    <Section id="story" backgroundImage={gardenImg} className="text-center">
      <h2 className="font-display text-4xl text-gold-gradient">{t("storyTitle")}</h2>
      <Divider className="mt-4" />
      <div className="mt-8 grid grid-cols-2 gap-4">
        {[groomImg, brideImg].map((src, i) => (
          <figure key={src} className="gold-frame overflow-hidden rounded-2xl">
            <img
              src={src}
              alt={i === 0 ? t("groom") : t("bride")}
              loading="lazy"
              className="h-44 w-full object-cover sm:h-64"
            />
            <figcaption className="bg-night-deep/80 py-2 font-display text-lg tracking-widest text-gold">
              {i === 0 ? t("groom") : t("bride")}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8 space-y-3 text-sm leading-relaxed text-foreground/80">
        <p>{t("story1")}</p>
        <p>{t("story2")}</p>
        <p>{t("story3")}</p>
      </div>
      <p className="mt-6 font-display text-xl italic text-gold/90">{t("storyQuote")}</p>
      <ScrollHint target="ceremony" />
    </Section>
  );
}

function Ceremony() {
  const { t } = useI18n();
  const cards = [
    { icon: CalendarDays, label: t("date"), value: t("dateVal"), sub: t("weekday") },
    { icon: Clock, label: t("time"), value: t("timeVal"), sub: "" },
    { icon: MapPin, label: t("place"), value: t("placeVal"), sub: t("placeVal2") },
  ];

  return (
    <Section id="ceremony" backgroundImage={gallery2} className="text-center">
      <h2 className="font-display text-4xl tracking-[0.15em] text-gold-gradient">{t("ceremonyTitle")}</h2>
      <Divider className="mt-4" />
      <div className="mt-8 space-y-4">
        {cards.map(({ icon: Icon, label, value, sub }) => (
          <div
            key={label}
            className="gold-frame flex items-center gap-4 rounded-2xl bg-night/70 px-5 py-4 text-left"
          >
            <Icon className="h-6 w-6 shrink-0 text-gold" />
            <div className="min-w-0">
              <p className="text-[0.65rem] tracking-[0.3em] text-gold/70">{label}</p>
              <p className="font-display text-2xl text-foreground">{value}</p>
              {sub ? <p className="text-xs text-foreground/60">{sub}</p> : null}
            </div>
          </div>
        ))}
      </div>
      <a
        href={MAP_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-sm tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-night"
      >
        <MapPin className="h-4 w-4" />
        {t("mapBtn")}
      </a>
      <ScrollHint target="countdown" />
    </Section>
  );
}

function Countdown() {
  const { t } = useI18n();
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const items = [
    { value: left.d, label: t("days") },
    { value: left.h, label: t("hours") },
    { value: left.m, label: t("minutes") },
    { value: left.s, label: t("seconds") },
  ];

  return (
    <Section id="countdown" backgroundImage={gallery3} className="text-center">
      <h2 className="font-display text-3xl tracking-[0.15em] text-gold-gradient">{t("countdownTitle")}</h2>
      <Divider className="mt-4" />
      <div className="mt-8 grid grid-cols-4 gap-2">
        {items.map((item) => (
          <div key={item.label} className="gold-frame rounded-2xl bg-night/70 px-1 py-4">
            <p className="font-display text-3xl text-gold sm:text-4xl">
              {String(item.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-[0.6rem] tracking-[0.15em] text-foreground/60">{item.label}</p>
          </div>
        ))}
      </div>
      <ScrollHint target="gallery" />
    </Section>
  );
}

function Gallery() {
  const { t } = useI18n();
  const images = [gallery1, coupleImg, gallery2, gardenImg, gallery3, finaleImg];
  return (
    <Section id="gallery" className="text-center">
      <h2 className="font-display text-4xl tracking-[0.15em] text-gold-gradient">{t("galleryTitle")}</h2>
      <Divider className="mt-4" />
      <div className="mt-8 grid grid-cols-2 gap-3">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${t("groom")} & ${t("bride")} ${i + 1}`}
            loading="lazy"
            className={`gold-frame w-full rounded-2xl object-cover ${
              i % 3 === 0 ? "h-56" : "h-40"
            }`}
          />
        ))}
      </div>
      <ScrollHint target="rsvp" />
    </Section>
  );
}

function Rsvp() {
  const { t } = useI18n();
  const send = useServerFn(submitRsvp);
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await send({ data: { name, attending, guests, note } });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="rsvp" backgroundImage={brideImg} className="text-center">
      <h2 className="font-display text-4xl tracking-[0.15em] text-gold-gradient">{t("rsvpTitle")}</h2>
      <Divider className="mt-4" />
      <p className="mt-3 text-sm text-foreground/70">{t("rsvpSub")}</p>

      {status === "done" ? (
        <div className="paper-card mt-8 rounded-3xl px-6 py-12">
          <CrownOrnament className="mx-auto" />
          <p className="mt-4 font-display text-2xl text-ink">{t("thanks")}</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-4 text-left">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name")}
            className="w-full rounded-xl border border-gold/40 bg-night/70 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/40"
          />
          <div className="grid grid-cols-2 gap-3">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                type="button"
                onClick={() => setAttending(value)}
                className={`rounded-xl border px-3 py-3 text-sm tracking-wide transition-colors ${
                  attending === value
                    ? "border-gold bg-gold text-night"
                    : "border-gold/40 bg-night/70 text-gold/80"
                }`}
              >
                {value ? t("coming") : t("notComing")}
              </button>
            ))}
          </div>
          {attending ? (
            <label className="block">
              <span className="text-xs tracking-[0.2em] text-gold/70">{t("guests")}</span>
              <input
                type="number"
                min={1}
                max={50}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value) || 1)}
                className="mt-1 w-full rounded-xl border border-gold/40 bg-night/70 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/40"
              />
            </label>
          ) : null}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("note")}
            rows={3}
            className="w-full rounded-xl border border-gold/40 bg-night/70 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-gold/40"
          />
          {status === "error" ? <p className="text-sm text-rose">{t("errorSend")}</p> : null}
          <button
            type="submit"
            disabled={status === "sending"}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gold bg-gold py-3 text-sm tracking-[0.25em] text-night disabled:opacity-60"
          >
            {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {status === "sending" ? t("sending") : t("send")}
          </button>
        </form>
      )}
      <ScrollHint target="finale" />
    </Section>
  );
}

function Finale() {
  const { t } = useI18n();
  return (
    <Section id="finale" backgroundImage={finaleImg} className="items-center text-center">
      <CrownOrnament className="mx-auto" />
      <h2 className="mt-6 font-display text-5xl text-gold-gradient">
        {t("groom")} <span className="text-gold/70">&</span> {t("bride")}
      </h2>
      <Divider className="mt-5" />
      <p className="mt-6 font-display text-2xl text-foreground/90">{t("finalTitle")}</p>
      <p className="mt-3 text-sm text-foreground/60">
        27.07.2027 · {t("timeVal")} · {t("placeVal")}
      </p>
    </Section>
  );
}

function Content() {
  return (
    <main className="relative">
      <StarField />
      <TopBar />
      <Hero />
      <Invite />
      <Story />
      <Ceremony />
      <Countdown />
      <Gallery />
      <Rsvp />
      <Finale />
      <BottomLinks />
    </main>
  );
}

export function WeddingPage() {
  return (
    <LanguageProvider>
      <MusicProvider>
        <Content />
      </MusicProvider>
    </LanguageProvider>
  );
}
