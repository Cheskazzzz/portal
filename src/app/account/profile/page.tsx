"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Appointment = { id: string; email: string; date: string; time: string; notes: string };

function getAppointments(): Appointment[] {
  try { return JSON.parse(localStorage.getItem('account_appointments') || '[]'); }
  catch { return []; }
}

export default function ProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState<{ name?: string; email?: string } | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    function load() {
      try {
        const s = JSON.parse(localStorage.getItem('account_session') || '{}');
        if (!s || !s.email) { router.push('/account/login'); return; }
        setSession(s);
        const all = getAppointments().filter(a => a.email === s.email);
        setAppointments(all);
      } catch { router.push('/account/login'); }
    }
    load();
    const onStorage = (e: StorageEvent) => { if (e.key === 'account_appointments' || e.key === 'account_session') load(); };
    const onEvent = () => load();
    window.addEventListener('storage', onStorage);
    window.addEventListener('account_session_changed', onEvent as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('account_session_changed', onEvent as EventListener);
    };
  }, [router]);

  function remove(id: string) {
    const all = getAppointments().filter(a => a.id !== id);
    localStorage.setItem('account_appointments', JSON.stringify(all));
    setAppointments(all.filter(a => a.email === session?.email));
  }

  return (
    <div style={{ padding:24, display:'flex', justifyContent:'center' }}>
      <div style={{ width: '100%', maxWidth:760, background: 'var(--legacy-form-bg)', padding:20, borderRadius:10 }}>
        <h2 style={{ marginTop:0 }}>Profile</h2>
        <div style={{ marginBottom:12 }}>
          <strong>Name:</strong> {session?.name || '—'}<br />
          <strong>Email:</strong> {session?.email || '—'}
        </div>

        <h3>Your Appointments</h3>
        <div style={{ maxWidth:560 }}>
          {appointments.length === 0 ? (
            <div style={{ padding:12, background:'#fff', borderRadius:8 }}>You have no appointments.</div>
          ) : (
            <ul style={{ listStyle:'none', padding:0, margin:0 }}>
              {appointments.map(a => (
                <li key={a.id} style={{ padding:12, border:'1px solid #eee', borderRadius:8, marginBottom:10, background:'#fff' }}>
                  <div><strong>{a.date} {a.time}</strong></div>
                  <div style={{ marginTop:6 }}>{a.notes}</div>
                  <button onClick={() => remove(a.id)} style={{ marginTop:8, padding:6, background:'#e06464', color:'#fff', border:0, borderRadius:6 }}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
