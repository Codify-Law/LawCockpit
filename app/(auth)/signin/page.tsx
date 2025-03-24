"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, LoaderCircle, Lock, Mail } from "lucide-react";
import Link from "next/link";
import useLogin from "./lib/useLogin";

export default function Page() {
  const { variables, methods } = useLogin();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const email = formData.get("email");
  //   const password = formData.get("password");
  //   const rememberMe = formData.get("rememberMe") === "on";

  //   await methods.onSubmit({
  //     email: email as string,
  //     password: password as string,
  //     rememberMe,
  //   });
  // };

  return (
    <div className="flex flex-col items-start justify-center min-h-[calc(100dvh-76px)]">
      <h1 className="font-EB-Garamond text-black font-bold text-[32px] mb-4 text-center w-full">
        CodifyLaw
      </h1>
      <div className="grid gap-6">
        <form
          onSubmit={
            variables.form.handleSubmit(methods.onSubmit)
            //   (e) => {
            //   e.preventDefault();
            //   handleSubmit(e);
            // }
          }
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

          {/* Remember me checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember-signin"
              className="bg-white cursor-pointer"
              {...variables.form.register("rememberMe")}
            />
            <label
              htmlFor="remember-signin"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Remember for 30 days
            </label>
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

          {/* Demo request link */}
          <div className="flex items-center justify-center py-3 text-base">
            Need an account?
            <Link
              href={"/book-a-demo"}
              className="text-sky-500 font-medium ml-3 hover:text-sky-700 transition-colors"
            >
              Request for a Demo
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
