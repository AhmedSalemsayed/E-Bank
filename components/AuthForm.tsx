"use client";
import React, {  useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authFormSchema = formSchema(type);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address1!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };
        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        console.log(response);
        if (response) router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


 
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-2 md:gap-8">
        <Link href="/" className="cursor-pointer items-center gap-1 flex">
          <Image src="/icons/logo.svg" width={34} height={34} alt="page logo" />
          <h1 className="text-26 font-ibm-plex-serif text-black-1 font-bold">
            E.Bank
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "link account" : type === "sign-in" ? "Sign-in" : "Sign-up"}
            <p className="text-16 font-normal text-gray-600 capitalize">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {" "}
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="Ex: John"
                      control={form.control}
                      disabled={isLoading}
                    />
                    <CustomInput
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Ex: Doe"
                      control={form.control}
                      disabled={isLoading}
                    />
                  </div>
                  <CustomInput
                    label="Address"
                    name="address1"
                    type="text"
                    placeholder="Enter Your Specific Address"
                    control={form.control}
                    disabled={isLoading}
                  />
                  <CustomInput
                    label="City"
                    name="city"
                    type="text"
                    placeholder="Enter Your City"
                    control={form.control}
                    disabled={isLoading}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      label="State "
                      name="state"
                      type="text"
                      placeholder="Ex: NY"
                      control={form.control}
                      disabled={isLoading}
                    />
                    <CustomInput
                      label="Postal Code"
                      name="postalCode"
                      type="text"
                      placeholder="Ex: 110359"
                      control={form.control}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="text"
                      placeholder="yyyy-mm-dd"
                      control={form.control}
                      disabled={isLoading}
                    />
                    <CustomInput
                      label="SSN"
                      name="ssn"
                      type="text"
                      placeholder="Ex: 1234"
                      control={form.control}
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}

              <CustomInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your Email"
                control={form.control}
                disabled={isLoading}
              />
              <CustomInput
                label="Password"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                control={form.control}
                disabled={isLoading}
              />
              <div>
                <Button
                  type="submit"
                  className="form-btn w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Dont Have An Account?"
                : "Already Have An Account"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/signUp" : "/signIn"}
            >
              {type === "sign-in" ? "Sign-Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
