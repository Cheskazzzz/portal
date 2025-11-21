"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = { name: string; email: string; password: string };

function getUsers(): User[] {
  try { return JSON.parse(localStorage.getItem('account_users') || '[]'); }
  catch { return []; }
}

type Appointment = { id: string; email: string; date: string; time: string; notes: string };

function getAppointments(): Appointment[] {
  try { return JSON.parse(localStorage.getItem('account_appointments') || '[]'); }
  catch { return []; }
}

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('account_session') || '{}');
      if (!s || s.email !== 'admin@gmail.com') { router.push('/account/login'); return; }
      // ensure admin credentials match the required admin password
      const all = getUsers();
      const admin = all.find(u => u.email === 'admin@gmail.com');
      if (!admin) {
        // create admin user if missing
        all.push({ name: 'Admin', email: 'admin@gmail.com', password: 'admin123' });
        localStorage.setItem('account_users', JSON.stringify(all));
      }
      const refreshed = getUsers();
      const adminNow = refreshed.find(u => u.email === 'admin@gmail.com');
      if (!adminNow || adminNow.password !== 'admin123') { router.push('/account/login'); return; }
      setUsers(refreshed);
      // also load appointments for admin view
      setAppointments(getAppointments());
    } catch { router.push('/account/login'); }
  }, [router]);

  function saveUser(e?: React.FormEvent) {
    e?.preventDefault();
    const all = getUsers();
    if (all.find(u => u.email === email)) return alert('Email already exists');
    const newName = (name && name.trim()) ? name : (email.split('@')[0] || '');
    all.push({ name: newName, email, password });
    localStorage.setItem('account_users', JSON.stringify(all));
    setUsers(all);
    setName(''); setEmail(''); setPassword('');
    // notify other components
    window.dispatchEvent(new Event('account_session_changed'));
  }

  function removeUser(targetEmail: string) {
    if (targetEmail === 'admin@gmail.com') return alert('Cannot remove admin account');
    const all = getUsers().filter(u => u.email !== targetEmail);
    localStorage.setItem('account_users', JSON.stringify(all));
    setUsers(all);
    window.dispatchEvent(new Event('account_session_changed'));
  }

  function removeAppointment(id: string) {
    const all = getAppointments().filter(a => a.id !== id);
    localStorage.setItem('account_appointments', JSON.stringify(all));
    setAppointments(all);
    // other components (profile) listen to storage or this event
    window.dispatchEvent(new Event('account_session_changed'));
  }

  return (
    <div style={{ padding:24 }}>
      <h2>Admin — Manage Users</h2>
      <div style={{ maxWidth:800, background:'var(--legacy-form-bg)', padding:16, borderRadius:8 }}>
        <form onSubmit={saveUser} style={{ display:'flex', gap:8, marginBottom:12, alignItems:'center' }}>
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} style={{ padding:8, border:'1px solid #dfe6ea', borderRadius:6 }} />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ padding:8, border:'1px solid #dfe6ea', borderRadius:6 }} />
          <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{ padding:8, border:'1px solid #dfe6ea', borderRadius:6 }} />
          <button type="submit" style={{ padding:8, background:'#1f6feb', color:'#fff', border:0, borderRadius:6 }}>Add</button>
        </form>

        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ textAlign:'left', borderBottom:'1px solid #e6eef2' }}>
              <th style={{ padding:8 }}>Name</th>
              <th style={{ padding:8 }}>Email</th>
              <th style={{ padding:8 }}>Password</th>
              <th style={{ padding:8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.email} style={{ borderBottom:'1px solid #f0f4f6' }}>
                <td style={{ padding:8 }}>{u.name}</td>
                <td style={{ padding:8 }}>{u.email}</td>
                <td style={{ padding:8 }}>{u.password}</td>
                <td style={{ padding:8 }}>
                  <button onClick={() => removeUser(u.email)} style={{ padding:6, background:'#e06464', color:'#fff', border:0, borderRadius:6 }}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <h3 style={{ marginTop:20 }}>Client Appointments</h3>
      <div style={{ maxWidth:800, background:'var(--legacy-form-bg)', padding:12, borderRadius:8 }}>
        {appointments.length === 0 ? (
          <div style={{ padding:12 }}>No appointments found.</div>
        ) : (
          <ul style={{ listStyle:'none', padding:0, margin:0 }}>
            {appointments.map(a => {
              const owner = getUsers().find(u => u.email === a.email);
              return (
                <li key={a.id} style={{ padding:12, border:'1px solid #eee', borderRadius:8, marginBottom:10, background:'#fff' }}>
                  <div><strong>{a.date} {a.time}</strong> — {owner ? owner.name : a.email}</div>
                  <div style={{ marginTop:6 }}>{a.notes}</div>
                  <button onClick={() => removeAppointment(a.id)} style={{ marginTop:8, padding:6, background:'#e06464', color:'#fff', border:0, borderRadius:6 }}>Delete</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
