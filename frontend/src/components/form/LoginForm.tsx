import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { useLoginUser } from "@/hooks/useLoginUser";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const LoginValidationSchema = z.object({
  email: z.string().min(1, "Email is required").email().trim(),
  password: z
    .string()
    .min(6, "Password must contain at least 6 character(s)")
    .max(128, "Password must contain at most 128 character(s)")
    .trim(),
});

const LoginForm = () => {
  const { mutate: login, isPending } = useLoginUser();

  const form = useForm<z.infer<typeof LoginValidationSchema>>({
    resolver: zodResolver(LoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginValidationSchema>) {
    login(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? <Loader2 className=" animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm my-1">or</p>
      <Button
        onClick={() =>
          login({
            email: import.meta.env.VITE_DUMMY_EMAIL,
            password: import.meta.env.VITE_DUMMY_PASSWORD,
          })
        }
        className="w-full"
      >
        {isPending ? <Loader2 className=" animate-spin" /> : "Explore Tasky"}
      </Button>
    </>
  );
};

export default LoginForm;
