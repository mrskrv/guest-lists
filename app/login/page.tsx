import { LoginForm } from "@/components/login-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-[family-name:var(--font-geist-mono)]">
      <LoginForm />
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "outline" }), "w-full")}
        data-fade="2"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Login;
