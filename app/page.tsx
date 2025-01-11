import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">Get started by register your guests.</li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <Link className={cn(buttonVariants())} href="/login">
          Get started
        </Link>
      </main>
    </div>
  );
}
