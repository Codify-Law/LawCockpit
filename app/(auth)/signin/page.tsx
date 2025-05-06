"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  BrainCircuit,
  LoaderCircle,
  Lock,
  Mail,
} from "lucide-react";
import useLogin from "./lib/useLogin";

export default function Page() {
  const { variables, methods } = useLogin();

  return (
    <div className="flex flex-col items-start justify-center min-h-[calc(100dvh-76px)]">
      <div className="rounded-sm bg-black mx-auto flex items-center justify-center w-16 h-16 mb-4">
        <BrainCircuit className="size-9 text-white" />
      </div>
      <h1 className="text-black font-black text-[32px] mb-14 text-center w-full">
        Codylex Cockpit
      </h1>
      <div className="grid gap-6">
        <form
          onSubmit={variables.form.handleSubmit(methods.onSubmit)}
          className="grid gap-4 w-96"
        >
          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input
                id="email"
                placeholder="enter your email address"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="h-[42px] bg-white pl-10 text-base"
                {...variables.form.register("email")}
              />
              <span className="absolute left-[14px] top-[13px] text-gray-500">
                <Mail className="w-4 h-4 block" />
              </span>
            </div>
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="enter your password"
                type="password"
                autoCapitalize="none"
                className="h-[42px] bg-white pl-10 text-base"
                {...variables.form.register("password")}
              />
              <span className="absolute left-[14px] top-[13px] text-gray-500">
                <Lock className="w-4 h-4 block" />
              </span>
            </div>
          </div>

          {/* Show error messages if either email or password have errors */}
          {variables.form.formState.errors.email ||
          variables.form.formState.errors.password ? (
            <div className="bg-red-100 rounded-md p-2 flex flex-col items-start justify-start gap-0.5">
              {/* Display email error message if present */}
              {variables.form.formState.errors.email && (
                <p className="text-red-800 text-sm">
                  {variables.form.formState.errors.email.message}
                </p>
              )}
              {/* Display password error message if present */}
              {variables.form.formState.errors.password && (
                <p className="text-red-800 text-sm">
                  {variables.form.formState.errors.password.message}
                </p>
              )}
            </div>
          ) : null}

          {/* Sign in button */}
          <Button
            type="submit"
            className="bg-zinc-500 h-11 flex items-center justify-center text-white cursor-pointer"
          >
            {variables.isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
