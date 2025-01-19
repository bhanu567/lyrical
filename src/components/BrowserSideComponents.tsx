"use client";
import dynamic from "next/dynamic";

export const BackgroundGradientComponent = dynamic(
  () =>
    import("./ui/background-gradient").then((mod) => mod.BackgroundGradient),
  {
    ssr: false,
  }
);

export const WavyBackgroundComponent = dynamic(
  () => import("./ui/wavy-background").then((mod) => mod.WavyBackground),
  { ssr: false }
);

export const AnimatedTooltipComponent = dynamic(
  () => import("./ui/animated-tooltip").then((mod) => mod.AnimatedTooltip),
  { ssr: false }
);
