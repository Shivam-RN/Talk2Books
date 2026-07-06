import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MicOff} from "lucide-react";

import { getBookBySlug } from "@/lib/actions/book.actions";
import VapiControls from "@/components/VapiControls";

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    redirect("/");
  }

  const book = result.data;

  return (
    <div className="book-page-container">
      {/* Floating back button */}
      <Link href="/" className="back-btn-floating">
        <ArrowLeft className="size-5 text-(--text-primary)" />
      </Link>

      <div className="max-w-4xl mx-auto flex flex-col gap-6">

       
        {/* ── 2. Transcript Area ── */}
        <VapiControls book = {book}/>

      </div>
    </div>
  );
}