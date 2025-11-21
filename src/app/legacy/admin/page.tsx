"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../page.module.css";
import RoleNav from "../RoleNav";

export default function AdminPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('legacy_session') || '{}');
      if (!s || s.role !== 'admin') {
        router.push('/legacy/login');
        return;
      }
      setName(s.name || '');
    } catch {
      router.push('/legacy/login');
    }
  }, [router]);

  return (
    <div className={styles.container} style={{ background: '#fff', color: '#000' }}>
      <header style={{ background: '#333', padding: 12, color: '#fff' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <a style={{ color:'#fff', fontWeight:700, textDecoration:'none' }}>MyCompany</a>
          <div style={{ marginLeft:'auto' }}>
            <RoleNav role="admin" />
          </div>
        </div>
      </header>

      <div style={{ padding: 40 }}>
        <h1 style={{ fontSize:40 }}>Welcome, <span style={{ color:'#5390fa' }}>{name}</span></h1>
        <p>This is the admin dashboard.</p>
      </div>
    </div>
  );
}
