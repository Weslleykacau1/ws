
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car, User, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres." }),
  role: z.enum(["passenger", "driver"], {
    required_error: "Você precisa selecionar um perfil.",
  }),
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const role = form.watch("role");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          name: values.name,
  const [loginType, setLoginType] = useState<"passenger" | "driver" | "admin">("passenger");
          role: values.role,
        }
      }
    });

    if (error) {
      let errorMessage = error.message;
      if (error.message.includes("email_not_confirmed")) {
        errorMessage = "Por favor, confirme seu email antes de fazer login.";
      } else if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou senha incorretos.";
      }
       toast({
        variant: "destructive",
        title: "Erro no Cadastro",
        description: errorMessage,
      });
      setIsSubmitting(false);
    } else {
        toast({
          title: "Cadastro Realizado!",
          description: "Agora, por favor, envie seus documentos.",
        });
    }
  };

  const handleQuickLogin = (type: "passenger" | "driver" | "admin") => {
    if (type === "admin") {
      setEmail("weslley.kacau@gmail.com");
      setPassword("Extra1382@");
    } else {
      setEmail("");
      setPassword("");
    }
    setLoginType(type);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm">
        <Button variant="ghost" size="icon" className="absolute top-4 left-4" onClick={() => router.push('/')}>
            <ArrowLeft />
        </Button>
        <div className="text-center mb-8">
            <Car className="h-12 w-12 mx-auto text-primary" />
            <h1 className="text-4xl font-bold text-primary mt-2">Criar Conta</h1>
            <p className="text-muted-foreground">Comece sua jornada com TriDriver.</p>
        </div>
        
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3 pt-2">
                    <FormLabel>Eu sou...</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                      >
                        <FormItem className="flex-1">
                          <RadioGroupItem value="passenger" id="passenger" className="sr-only" />
                          <FormLabel htmlFor="passenger" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all">
                            <User className="mb-3 h-6 w-6" />
                            Passageiro
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex-1">
                          <RadioGroupItem value="driver" id="driver" className="sr-only" />
                           <FormLabel htmlFor="driver" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all">
                            <Car className="mb-3 h-6 w-6" />
                            Motorista
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {role && (
                <div className="space-y-4 animate-in fade-in-0 slide-in-from-top-4 duration-500">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Nome Completo" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
        <Tabs value={loginType} onValueChange={(value) => handleQuickLogin(value as "passenger" | "driver" | "admin")} className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="passenger" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Passageiro
            </TabsTrigger>
            <TabsTrigger value="driver" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Motorista
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>
        </Tabs>
                      <FormItem>
                        <FormControl>
                          <Input type="password" placeholder="Senha" {...field} className="h-12 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <Button type="submit" className="w-full !mt-6 h-12 text-lg font-bold" disabled={!form.formState.isValid || isSubmitting}>
                     {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Continuar
                  </Button>
                </div>
              )}
            </form>
          </Form>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/" className="font-semibold text-primary hover:underline">
              Entrar
            </Link>
          </div>
      </div>
              {loginType === "passenger" && (
                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Entrar como Passageiro
                </Button>
              )}
              {loginType === "driver" && (
                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Entrar como Motorista
                </Button>
              )}
                  Entrar como Admin
    </main>
              )}
  );
}
