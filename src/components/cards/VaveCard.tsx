'use client'
import Image from "next/image";

export function VaveCard() {
  return (
    <div className="h-56 relative overflow-hidden rounded-xl">
      <Image
        src="/assets/home/VAVE.png"
        alt="VAVE and competitive benchmarking dashboard"
        fill
        className="object-cover"
      />
    </div>
  );
}
