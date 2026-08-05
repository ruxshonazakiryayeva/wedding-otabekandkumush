import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const VIDEO_ID = "KPk1omkYQLc";

type Ctx = { playing: boolean; toggle: () => void; play: () => void; pause: () => void };

const MusicContext = createContext<Ctx>({
  playing: false,
  toggle: () => {},
  play: () => {},
  pause: () => {},
});

export function MusicProvider({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const send = useCallback((func: "playVideo" | "pauseVideo" | "unMute") => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );
  }, []);

  const play = useCallback(() => {
    send("unMute");
    send("playVideo");
    setPlaying(true);
  }, [send]);

  const pause = useCallback(() => {
    send("pauseVideo");
    setPlaying(false);
  }, [send]);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  return (
    <MusicContext.Provider value={{ playing, toggle, play, pause }}>
      {children}
      {mounted ? (
        <iframe
          ref={frameRef}
          title="Wedding music"
          aria-hidden="true"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?enablejsapi=1&autoplay=0&loop=1&playlist=${VIDEO_ID}&controls=0&playsinline=1`}
          style={{
            position: "fixed",
            width: 1,
            height: 1,
            bottom: 0,
            left: 0,
            opacity: 0,
            border: 0,
            pointerEvents: "none",
          }}
        />
      ) : null}
    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);
