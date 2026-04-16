import { redirect } from "next/navigation";

// 業師個人頁暫時關閉，統一導回業師列表
// 待資料補齊後重新開放
export default function MentorProfilePage() {
  redirect("/mentors");
}

export async function generateStaticParams() {
  // 回傳空陣列，不預生成任何個人頁
  return [];
}
