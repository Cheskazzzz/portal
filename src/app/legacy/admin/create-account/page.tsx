"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('legacy_session') || '{}');
      if (!s || s.role !== 'admin') { router.push('/legacy/login'); return; }
    } catch { router.push('/legacy/login'); return; }
  }, [router]);

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name')?.toString()||'';
    const email = fd.get('email')?.toString()||'';
    const password = fd.get('password')?.toString()||'';
    const role = fd.get('role')?.toString()||'';

    const users = JSON.parse(localStorage.getItem('legacy_users') || '[]');
    if (users.find((u:any)=>u.email===email)) { setError('Email already exists'); return; }
    users.push({ name, email, password, role });
    localStorage.setItem('legacy_users', JSON.stringify(users));
    router.push('/legacy/admin/employees');
  }

  return (
    <div style={{ padding:24 }}>
      <h2>Create Account (Admin only)</h2>
      {error && <div style={{ background:'#f8d7da', color:'#a42834', padding:8 }}>{error}</div>}
      <form onSubmit={handleCreate} style={{ maxWidth:480 }}>
        <input name="name" placeholder="Name" required style={{ width:'100%', padding:10, marginBottom:8 }} />
        <input name="email" placeholder="Email" required style={{ width:'100%', padding:10, marginBottom:8 }} />
        <input name="password" placeholder="Password" required style={{ width:'100%', padding:10, marginBottom:8 }} />
        <select name="role" required style={{ width:'100%', padding:10, marginBottom:8 }}>
          <option value="">--Select Role--</option>
          <option value="employee">Employee</option>
          <option value="client">Client</option>
        </select>
        <button style={{ padding:10, background:'#1f6feb', color:'#fff', border:0 }}>Create</button>
      </form>
    </div>
  );
}
