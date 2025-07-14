
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await login({ email, password });
    if (error) {
      toast({
        variant: "destructive",
        title: "Falha no Login",
        description: error.message,
      });
      setIsLoading(false);
    } else {
       toast({
        title: "Login bem-sucedido!",
      });
      // The auth context will handle redirection via onAuthStateChange
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background text-foreground">
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        <Car className="h-14 w-14 mb-6 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Bem-vindo de volta</h1>
        <p className="mt-2 text-muted-foreground">Faça login para continuar</p>

        <form onSubmit={handleLogin} className="w-full space-y-4 mt-8">
          <Input 
            type="email" 
            placeholder="Email" 
            className="h-12" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <Input 
            type="password" 
            placeholder="Senha" 
            className="h-12" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <div className="text-right">
            <Link href="https://wa.me/5511912345678" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
           <div className="space-y-2 !mt-6">
              <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar
              </Button>
           </div>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </main>
  );
}
