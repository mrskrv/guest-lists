"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import useLoaded from "@/hooks/useLoaded";
import { signin } from "@/lib/actions";

const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export const LoginForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const isLoaded = useLoaded();
  const { toast } = useToast();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const res = await signin(values);

    if (!res.success) {
      toast({
        variant: "destructive",
        title: "Login Failed!",
        description: res.message + " Please go home and cry.",
      });
      setSubmitting(false);
    } else {
      toast({
        variant: "default",
        title: "You are in!",
        description: res.message,
      });
      setSubmitting(false);
      form.reset();
      router.push("/dashboard");
    }
  }

  return (
    <div
      className={cn(
        isLoaded && "fade-in-start",
        "w-3/4 mx-auto h-screen flex flex-col justify-center items-center gap-2"
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem data-fade="1">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem data-fade="1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*********" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={submitting}
              data-fade="2"
            >
              {submitting ? "Loading..." : "Continue"}
            </Button>
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
              data-fade="3"
            >
              Back to Home
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
