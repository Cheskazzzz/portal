import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

export default function Navbar() {
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

      <div>
        <Link href="/legacy/login">Log In</Link>
      </div>
    </header>
  );
}
