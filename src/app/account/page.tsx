"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AccountIndex() {
  const [session, setSession] = useState<{ name?: string; email?: string } | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    function load() {
      try {
        const s = JSON.parse(localStorage.getItem('account_session') || '{}');
        if (s && s.email) setSession(s);
        else setSession(null);
      } catch { setSession(null); }
    }
    load();
    try {
      const users = JSON.parse(localStorage.getItem('account_users') || '[]');
      const sess = JSON.parse(localStorage.getItem('account_session') || '{}');
      const me = users.find((u: any) => u.email === sess.email);
      setPassword(me ? me.password : null);
    } catch { setPassword(null); }
    window.addEventListener('account_session_changed', load as EventListener);
    window.addEventListener('storage', (e: StorageEvent) => { if (e.key === 'account_session') load(); });
    return () => {
      window.removeEventListener('account_session_changed', load as EventListener);
      window.removeEventListener('storage', (e: StorageEvent) => { if (e.key === 'account_session') load(); });
    };
  }, []);

  if (!session) {
    return (
      <div style={{ padding:24 }}>
        <h2>Account</h2>
        <p>You are not signed in.</p>
        <p><Link href="/account/login">Log in</Link> or <Link href="/account/register">Register</Link></p>
      </div>
    );
  }

  return (
    <div style={{ padding:24 }}>
      <h2>Account</h2>
      <div style={{ maxWidth:560, background:'var(--legacy-form-bg)', padding:16, borderRadius:8 }}>
        <p><strong>Name:</strong> {session.name}</p>
        <p><strong>Email:</strong> {session.email}</p>
        <p><strong>Password:</strong> {password ?? '—'}</p>
        <div style={{ marginTop:12 }}>
          <Link href="/account/appointments" style={{ marginRight:12 }}>Appointments</Link>
          <Link href="/account/logout" style={{ color:'#e06464' }}>Log out</Link>
        </div>
      </div>
    </div>
  );
}
