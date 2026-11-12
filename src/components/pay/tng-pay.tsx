"use client";

import Image from "next/image";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const QR_SRC = "/pay/getkerja-tng-qr.png";
const ANDROID_PKG = "my.com.tngdigital.ewallet";
const PLAY_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PKG}`;
const APP_STORE_URL = "https://apps.apple.com/my/app/id1344696702";
const IOS_SCHEME = "tngdwallet://";

/** Opens the Touch 'n Go eWallet app (falls back to the app store if it isn't installed). */
function openTng() {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) {
    window.location.href = `intent://#Intent;package=${ANDROID_PKG};S.browser_fallback_url=${encodeURIComponent(PLAY_URL)};end`;
    return;
  }
  if (/iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
    const t = window.setTimeout(() => {
      if (!document.hidden) window.location.href = APP_STORE_URL;
    }, 1600);
    document.addEventListener("visibilitychange", () => document.hidden && window.clearTimeout(t), { once: true });
    window.location.href = IOS_SCHEME;
    return;
  }
  // Desktop: nothing to open — the QR is scanned with the phone.
  document.getElementById("tng-qr")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function TngPay() {
  return (
    <div className="flex flex-col items-center gap-5">
      <button
        id="tng-qr"
        type="button"
        onClick={openTng}
        className="w-full max-w-sm overflow-hidden rounded-3xl border bg-white shadow-lg outline-none transition-transform hover:scale-[1.01] focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label="Open Touch 'n Go eWallet to pay"
      >
        <Image src={QR_SRC} alt="getKerja Touch 'n Go eWallet DuitNow QR — QURESHI MUZAMMIL AHMED GETKERJA" width={1038} height={1600} priority className="h-auto w-full" />
      </button>

      <div className="flex w-full max-w-sm flex-col gap-3">
        <Button size="lg" onClick={openTng} className="w-full bg-[#0055b8] text-white hover:bg-[#00479a]">
          <ExternalLink /> Open Touch ’n Go eWallet
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full">
          <a href={QR_SRC} download="getkerja-tng-qr.png"><Download /> Save QR to your phone</a>
        </Button>
      </div>
    </div>
  );
}
