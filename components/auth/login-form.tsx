"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { Lock, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { SigninSchema, SigninSchemaType } from "@/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { FormInput } from "../ui/form/form-input";

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, register } = form;

  const handleSignin = async (data: SigninSchemaType) => {
    setLoading(true);
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    setLoading(false);

    if (response.error === "CredentialsSignin") {
      setError("Email ou mot de passe incorrect");
    } else {
      const session = await getSession();
      const role = session?.user?.role;

      if (role === "ADMIN") {
        redirect("/admin");
      } else if (role === "EMPLOYEE") {
        redirect("/employee");
      } else {
        redirect("/");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSignin)} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <FormInput
          name="email"
          label="Email"
          type="email"
          Icon={Mail}
          placeholder="Votre email"
        />

        <FormInput
          name="password"
          label="Mot de passe"
          type="password"
          Icon={Lock}
          placeholder="Votre mot de passe"
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>
    </Form>
  );
}
