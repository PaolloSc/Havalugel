"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(4, "Mínimo de 4 caracteres"),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [erro, setErro] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    const result = login(data.email, data.senha);
    if (!result.ok) {
      setErro(result.erro);
      return;
    }
    router.push(searchParams.get("next") || "/conta");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <span className="text-xs font-bold uppercase tracking-widest text-hava-orange">Área do cliente</span>
      <h1 className="mt-2 mb-8 font-display text-5xl leading-none text-hava-white">ENTRAR</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="E-mail" type="email" {...register("email")} error={errors.email?.message} />
        <Input label="Senha" type="password" {...register("senha")} error={errors.senha?.message} />
        {erro && <p className="text-sm text-hava-orange-light">{erro}</p>}
        <Button type="submit" disabled={isSubmitting} className="w-full justify-center">
          Entrar
        </Button>
      </form>

      <p className="mt-6 text-sm text-hava-gray">
        Ainda não tem conta?{" "}
        <Link href="/cadastro" className="font-bold text-hava-orange">
          Cadastre-se
        </Link>
      </p>
      <p className="mt-2 text-xs text-hava-gray/70">
        Protótipo: sua conta fica salva só neste navegador (localStorage).
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
