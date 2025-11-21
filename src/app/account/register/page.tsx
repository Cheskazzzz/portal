"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  function getUsers() {
    try { return JSON.parse(localStorage.getItem("account_users") || "[]"); }
    catch { return []; }
  }

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.toString() || "";
    const email = fd.get("email")?.toString() || "";
    const password = fd.get("password")?.toString() || "";

    const users = getUsers();
    if (users.find((u: any) => u.email === email)) {
      setError("Email is already registered!");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("account_users", JSON.stringify(users));
    localStorage.setItem('account_session', JSON.stringify({ name, email }));
    try { window.dispatchEvent(new Event('account_session_changed')); } catch {}
    router.push('/account/appointments');
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#787878d0'
    }}>
      <div style={{ width: 420, background: 'var(--legacy-form-bg)', padding: 28, borderRadius: 8, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, marginBottom: 18 }}>Register</h2>
       
        <form onSubmit={handleRegister}>
          <input name="name" type="text" placeholder="Name" required style={{ width:'100%', padding:12, marginBottom:12, borderRadius:6, border:'1px solid #dfe6ea' }} />
          <input name="email" type="email" placeholder="Email" required style={{ width:'100%', padding:12, marginBottom:12, borderRadius:6, border:'1px solid #dfe6ea' }} />
          <input name="password" type="password" placeholder="Password" required style={{ width:'100%', padding:12, marginBottom:12, borderRadius:6, border:'1px solid #dfe6ea' }} />
          <button type="submit" style={{ width:'100%', padding:12, background:'#1f6feb', color:'#fff', border:'none', borderRadius:6 }}>Register</button>
        </form>
        <p style={{ textAlign:'center', marginTop:12, color:'#666' }}>Already have an account? <a href="/account/login" style={{ color: '#1f6feb', fontWeight:600 }}>Login</a></p>
      </div>
    </div>
  );
}
