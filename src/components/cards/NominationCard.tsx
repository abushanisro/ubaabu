'use client'
import Image from "next/image";

export function NominationCard() {
  return (
    <div className="h-56 relative overflow-hidden rounded-xl">
      <Image
        src="/assets/home/nomination.png"
        alt="Supplier nomination and evaluation dashboard"
        fill
        className="object-cover object-center"
      />
    </div>
  );
}
