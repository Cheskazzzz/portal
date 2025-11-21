"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Appointment = { id: string; email: string; date: string; time: string; notes: string };

function getAppointments(): Appointment[] {
  try { return JSON.parse(localStorage.getItem('account_appointments') || '[]'); }
  catch { return []; }
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('account_session') || '{}');
      if (!s || !s.email) { router.push('/account/login'); return; }
      const all = getAppointments().filter(a => a.email === s.email);
      setAppointments(all);
    } catch { router.push('/account/login'); }
  }, [router]);

  function save() {
    try {
      const s = JSON.parse(localStorage.getItem('account_session') || '{}');
      if (!s || !s.email) { router.push('/account/login'); return; }
      const all = getAppointments();
      const id = Date.now().toString();
      const ap = { id, email: s.email, date, time, notes };
      all.push(ap);
      localStorage.setItem('account_appointments', JSON.stringify(all));
      setAppointments(all.filter(a => a.email === s.email));
      setDate(''); setTime(''); setNotes('');
    } catch (err) { console.error(err); }
  }

  function remove(id: string) {
    const all = getAppointments().filter(a => a.id !== id);
    localStorage.setItem('account_appointments', JSON.stringify(all));
    try {
      const s = JSON.parse(localStorage.getItem('account_session') || '{}');
      setAppointments(all.filter(a => a.email === s.email));
    } catch { setAppointments([]); }
  }

  return (
    <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 760, background: 'var(--legacy-form-bg)', padding: 20, borderRadius: 10, boxShadow: '0 8px 30px rgba(174, 161, 161, 0.06)' }}>
        <h2 style={{ marginTop: 0 }}>Appointments</h2>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display:'block', marginBottom:8 }}>Date</label>
            <input
              value={date}
              onChange={e=>setDate(e.target.value)}
              type="date"
              style={{ padding:10, width:'100%', marginBottom:0, borderRadius:6, border:'1px solid #dfe6ea', background:'#fff' }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display:'block', marginBottom:8 }}>Time</label>
            <input
              value={time}
              onChange={e=>setTime(e.target.value)}
              type="time"
              style={{ padding:10, width:'100%', marginBottom:0, borderRadius:6, border:'1px solid #dfe6ea', background:'#fff' }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display:'block', marginBottom:8 }}>Notes</label>
            <textarea
              value={notes}
              onChange={e=>setNotes(e.target.value)}
              style={{ padding:10, width:'100%', marginBottom:0, minHeight:100, borderRadius:6, border:'1px solid #dfe6ea', background:'#fff' }}
            />
          </div>

          <button onClick={save} style={{ padding:10, background:'#111', color:'#fff', border:0, width:'100%', borderRadius:6 }}>Save Appointment</button>
        </div>

        {/* User-specific appointments moved to Profile page */}
      </div>
    </div>
  );
}
