import { redirect } from "next/navigation";

export default function LegacyIndex() {
  // Redirect `/legacy` to the dedicated login page
  redirect("/legacy/login");
}
