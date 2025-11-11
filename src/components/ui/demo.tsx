import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function DemoOne() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <ShaderAnimation />
      <span className="pointer-events-none absolute z-10 whitespace-pre-wrap text-center text-5xl font-semibold leading-none tracking-[0.2em] text-white md:text-7xl">
        AUTOBUILDER
      </span>
    </div>
  );
}
