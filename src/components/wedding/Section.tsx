import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  id: string;
  children: ReactNode;
  backgroundImage?: string;
  overlay?: "strong" | "soft" | "none";
  className?: string;
};

export function Section({ id, children, backgroundImage, overlay = "strong", className = "" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden">
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-fixed"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      ) : null}
      {overlay === "none" ? null : (
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              overlay === "strong"
                ? "linear-gradient(180deg, oklch(0.12 0.045 266 / 0.78), oklch(0.12 0.045 266 / 0.92))"
                : "linear-gradient(180deg, oklch(0.12 0.045 266 / 0.45), oklch(0.12 0.045 266 / 0.78))",
          }}
        />
      )}
      <div
        className={`reveal relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16 sm:max-w-xl sm:px-8 lg:max-w-2xl ${
          visible ? "is-visible" : ""
        } ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
