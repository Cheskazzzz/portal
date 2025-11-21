"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminClients() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('legacy_session') || '{}');
      if (!s || s.role !== 'admin') { router.push('/legacy/login'); return; }
    } catch { router.push('/legacy/login'); return; }

    const all = JSON.parse(localStorage.getItem('legacy_users') || '[]');
    setUsers(all.filter((u:any) => u.role === 'client'));
  }, [router]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Clients</h2>
      <ul>
        {users.map((u) => (
          <li key={u.email} style={{ padding:8, borderBottom: '1px solid #eee' }}>{u.name} — {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

