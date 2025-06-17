"use client";
import GoogleIcon from "@/svg/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EyeIcon from "@/svg/EyeIcon";
import EyeOffIcon from "@/svg/EyeOffIcon";
function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("email"));
    console.log(data.get("password"));
    const res = await signIn("credentials", {
      redirect: false,
      email: data.get("email"),
      password: data.get("password"),
      callbackUrl: "/",
    });
    console.log(res);
    if (res?.error) {
      console.log("Error al iniciar sesión");
      setError(res.error);
      //alert(res.error);
    } else {
      console.log("Iniciando sesión");
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-4xl bg-gradient-to-r from-rose-400 to-purple-400 p-4 rounded-lg rounded-br-none rounded-bl-none">
        Iniciar Sesión
      </h2>
      <div className="grid place-items-center md:grid-cols-1 lg:gap-12 ">
        <div className="rounded-lg  rounded-tr-none rounded-tl-none bg-white p-6 shadow-md w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="josé@gmail.com"
                  className="focus:ring-none mt-1 block w-full rounded-md  bg-background px-3 py-2 text-foreground shadow-sm border-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    required
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="*****"
                    className="focus:ring-none mt-1 block w-full rounded-md  bg-background px-3 py-2 text-foreground shadow-sm border-gray-400"
                  />
                  {showPassword ? (
                    <EyeOffIcon
                      onClick={() => setShowPassword(false)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    />
                  ) : (
                    <EyeIcon
                      onClick={() => setShowPassword(true)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    />
                  )}
                </div>
              </div>
              {error && (
                <div className="col-span-2">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-col">
              <Button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-rose-400 to-purple-400 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-gradient-to-r hover:from-rose-300 hover:to-purple-300 md:px-12 md:text-sm p-2 w-full"
              >
                Iniciar Sesión
              </Button>
              <Separator className="bg-gray-300" />
              <Button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="bg-white p-2 rounded-md text-black border-gray-600 border hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 w-full text-sm"
              >
                <GoogleIcon className="w-5 h-5" />
                Iniciar Sesión con Google
              </Button>
            </div>
          </form>
          <div className=" mt-6 flex gap-1 justify-end items-center">
            <p className="text-muted-foreground">¿No tienes cuenta?</p>
            <Link
              href="/auth/register"
              className="underline text-rose-400 hover:text-rose-500 decoration-rose-400"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
