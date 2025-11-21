"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "../page.module.css";

export default function Navbar() {
  const [signedIn, setSignedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    function check() {
      try {
        const s = JSON.parse(localStorage.getItem('account_session') || '{}');
        setSignedIn(Boolean(s && s.email));
        setIsAdmin(Boolean(s && s.email === 'admin@gmail.com'));
        if (s && s.email) {
          const name = s.name || s.email;
          const parts = name.split(/\s+/).filter(Boolean);
          const initials = parts.length === 1 ? parts[0].slice(0,2) : (parts[0][0] + parts[parts.length-1][0]);
          setUserInitials(initials.toUpperCase());
        } else {
          setUserInitials('');
        }
      } catch {
        setSignedIn(false);
        setIsAdmin(false);
        setUserInitials('');
      }
    }
    check();
    // update on storage events (other tabs) and custom events
    const onStorage = (e: StorageEvent) => { if (e.key === 'account_session') check(); };
    window.addEventListener('storage', onStorage);
    window.addEventListener('account_session_changed', check as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('account_session_changed', check as EventListener);
    };
  }, []);

  return (
    <header className={styles.nav}>
      <div className={styles.logo}>
        <Image src="/Logo.ico" alt="Logo" width={32} height={32} />
        <Link href="/">Perez-Loreño Engineering Firm</Link>
      </div>

      <nav className={styles.center}>
        <Link href="/">Home</Link>
        <Link href="/about-us">About Us</Link>
        <Link href="/contact-us">Contact Us</Link>
        <Link href="/gallery">Gallery</Link>
      </nav>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {signedIn ? (
          <>
            {!(pathname && pathname.startsWith('/account/admin')) && (
              <Link href="/account/appointments">Appointments</Link>
            )}
            {isAdmin && <Link href="/account/admin">Admin</Link>}
            <Link href="/account/logout" style={{ color: '#e06464' }}>Log Out</Link>
            <Link href="/account/profile" style={{ textDecoration: 'none', marginLeft:8 }} title="Profile">
              <div style={{ width:32, height:32, borderRadius:999, background:'#111', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:600 }}>{userInitials || 'U'}</div>
            </Link>
          </>
        ) : (
          <Link href="/account/login">Log In</Link>
        )}
      </div>
    </header>
  );
}
