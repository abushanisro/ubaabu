'use client'
import Image from "next/image";

export function SupplierEvalCard() {
  return (
    <div className="h-56 relative overflow-hidden rounded-xl">
      <Image
        src="/assets/home/costtoprod1.png"
        alt="Supplier evaluation"
        fill
        className="object-cover"
      />
    </div>
  );
}
