"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    try { localStorage.removeItem('account_session'); } catch {}
    try { window.dispatchEvent(new Event('account_session_changed')); } catch {}
    router.push('/');
  }, [router]);
  return <div />;
}
