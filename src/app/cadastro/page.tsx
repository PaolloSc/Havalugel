"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const schema = z.object({
  nome: z.string().min(2, "Informe seu nome completo"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(8, "Telefone inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  cnh: z.string().min(5, "Número da CNH inválido"),
  senha: z.string().min(4, "Mínimo de 4 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function CadastroPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [erro, setErro] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormData) {
    const result = registerUser(data);
    if (!result.ok) {
      setErro(result.erro);
      return;
    }
    router.push("/conta");
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-5 py-16">
      <span className="text-xs font-bold uppercase tracking-widest text-hava-orange">Área do cliente</span>
      <h1 className="mt-2 mb-8 font-display text-5xl leading-none text-hava-white">CADASTRO</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Nome completo" {...register("nome")} error={errors.nome?.message} />
        <Input label="E-mail" type="email" {...register("email")} error={errors.email?.message} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Telefone" {...register("telefone")} error={errors.telefone?.message} />
          <Input label="CPF" {...register("cpf")} error={errors.cpf?.message} />
        </div>
        <Input label="CNH" {...register("cnh")} error={errors.cnh?.message} />
        <Input label="Senha" type="password" {...register("senha")} error={errors.senha?.message} />
        {erro && <p className="text-sm text-hava-orange-light">{erro}</p>}
        <Button type="submit" disabled={isSubmitting} className="w-full justify-center">
          Criar conta
        </Button>
      </form>

      <p className="mt-6 text-sm text-hava-gray">
        Já tem conta?{" "}
        <Link href="/login" className="font-bold text-hava-orange">
          Entrar
        </Link>
      </p>
    </div>
  );
}
