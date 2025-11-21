"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RoleNav({ role }: { role: string }) {
  const path = usePathname();

  const link = (href: string, label: string) => (
    <Link href={href} style={{
      padding: '8px 12px',
      borderRadius: 6,
      color: path?.startsWith(href) ? '#1f6feb' : '#222',
      textDecoration: 'none',
      fontWeight: 600,
      marginRight: 8,
      background: path?.startsWith(href) ? 'rgba(31,111,235,0.06)' : 'transparent'
    }}>{label}</Link>
  );

  if (role === 'admin') {
    return (
      <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {link('/legacy/admin/services','Services')}
        {link('/legacy/admin/projects','Projects')}
        {link('/legacy/admin/employees','Employees')}
        {link('/legacy/admin/clients','Clients')}
        {link('/legacy/admin/create-account','Create Account')}
        <Link href="/legacy/logout" style={{ marginLeft: 12, color: '#e06464', fontWeight:600 }}>Log Out</Link>
      </nav>
    );
  }

  if (role === 'employee') {
    return (
      <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {link('/legacy/employee/profile','Profile')}
        {link('/legacy/employee/projects','Projects')}
        <Link href="/legacy/logout" style={{ marginLeft: 12, color: '#e06464', fontWeight:600 }}>Log Out</Link>
      </nav>
    );
  }

  // client
  return (
    <nav style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {link('/legacy/client/profile','Profile')}
      {link('/legacy/client/projects','Project Status')}
      {link('/legacy/client/request-update','Request Update')}
      {link('/contact-us','Contact Us')}
      <Link href="/legacy/logout" style={{ marginLeft: 12, color: '#e06464', fontWeight:600 }}>Log Out</Link>
    </nav>
  );
}
