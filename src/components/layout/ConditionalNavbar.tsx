"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const HIDDEN_ON = ["/contact", "/request-demo"];

export default function ConditionalNavbar() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return <Navbar />;
}
