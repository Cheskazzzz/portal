import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem('legacy_session');
    router.push('/legacy');
  }, [router]);
  return <div />;
}
