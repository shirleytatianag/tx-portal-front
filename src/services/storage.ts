"use client";
import SecureLS from "secure-ls";

let ls: SecureLS | null = null;

if (typeof window !== "undefined") {
  ls = new SecureLS({ encodingType: "aes", isCompression: false });
}

export function setItem(key: string, value: any) {
  if (ls) ls.set(key, value);
}

export function getItem(key: string) {
  if (ls) return ls.get(key);
}

export function removeAll(): void {
  if (ls) ls.removeAll();
}



