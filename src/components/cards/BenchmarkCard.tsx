'use client'
import Image from "next/image";

export function BenchmarkCard() {
  return (
    <div className="h-56 relative overflow-hidden rounded-xl">
      <Image
        src="/assets/home/process.png"
        alt="Benchmark analysis"
        fill
        className="object-cover"
      />
    </div>
  );
}
