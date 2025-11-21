"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  function getUsers() {
    try { return JSON.parse(localStorage.getItem("legacy_users") || "[]"); }
    catch { return []; }
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email")?.toString() || "";
    const password = fd.get("password")?.toString() || "";

    const users = getUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      setError("Incorrect email or password.");
      return;
    }

    localStorage.setItem('legacy_session', JSON.stringify({ name: user.name, email: user.email, role: user.role }));
    if (user.role === 'admin') router.push('/legacy/admin');
    else if (user.role === 'employee') router.push('/legacy/employee');
    else router.push('/legacy/client');
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#787878d0'
    }}>
      <div style={{ width: 420, background: 'var(--legacy-form-bg)', padding: 28, borderRadius: 8, boxShadow: '0 8px 30px rgba(174, 161, 161, 0.06)' }}>
        <h2 style={{ textAlign: 'center', fontSize: 28, marginBottom: 18 }}>Login</h2>
       
        <form onSubmit={handleLogin}>
          <input name="email" type="email" placeholder="Email" required style={{ width:'100%', padding:12, marginBottom:12, borderRadius:6, border:'1px solid #dfe6ea' }} />
          <input name="password" type="password" placeholder="Password" required style={{ width:'100%', padding:12, marginBottom:12, borderRadius:6, border:'1px solid #dfe6ea' }} />
          <button type="submit" style={{ width:'100%', padding:12, background:'#1f6feb', color:'#fff', border:'none', borderRadius:6 }}>Login</button>
        </form>
        <p style={{ textAlign:'center', marginTop:12, color:'#666' }}>Don't have an account? <a href="/legacy/register" style={{ color: '#1f6feb', fontWeight:600 }}>Register</a></p>
      </div>
    </div>
  );
}
