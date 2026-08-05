import { createContext, useContext, useRef, useState, type ReactNode } from "react";

const VIDEO_ID = "KPk1omkYQLc";

type Ctx = { playing: boolean; toggle: () => void };
const MusicContext = createContext<Ctx>({ playing: false, toggle: () => {} });

export function MusicProvider({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const command = (func: "playVideo" | "pauseVideo") => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );
  };

  const toggle = () => {
    if (!mounted) {
      setMounted(true);
      setPlaying(true);
      window.setTimeout(() => command("playVideo"), 1200);
      return;
    }
    const next = !playing;
    setPlaying(next);
    command(next ? "playVideo" : "pauseVideo");
  };

  return (
    <MusicContext.Provider value={{ playing, toggle }}>
      {children}
      {mounted ? (
        <iframe
          ref={frameRef}
          title="Wedding music"
          aria-hidden="true"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?enablejsapi=1&autoplay=1&loop=1&playlist=${VIDEO_ID}&controls=0&playsinline=1`}
          style={{
            position: "fixed",
            width: 1,
            height: 1,
            opacity: 0,
            pointerEvents: "none",
            bottom: 0,
            left: 0,
          }}
        />
      ) : null}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  return useContext(MusicContext);
}
