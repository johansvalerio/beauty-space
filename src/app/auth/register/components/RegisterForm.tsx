"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EyeIcon from "@/svg/EyeIcon";
import EyeOffIcon from "@/svg/EyeOffIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function RegisterForm() {
  const router = useRouter();
  //set error for server error and reactive password control
  const [error, setError] = useState<string | null>(null);
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // Subir la imagen a Cloudinary
    const imageInput =
      event.currentTarget.querySelector<HTMLInputElement>('input[type="file"]');
    let imageUrl = "";

    if (imageInput && imageInput.files && imageInput.files[0]) {
      const uploadData = new FormData();
      uploadData.append("file", imageInput.files[0]);

      const uploadRes = await fetch("/api/auth/register/images", {
        method: "POST",
        body: uploadData,
      });

      const uploadResData = await uploadRes.json();

      if (!uploadRes.ok) {
        setError(uploadResData.error);
        return;
      }

      imageUrl = uploadResData.url;
      setSelectImage(imageUrl);
    }
    //const patronContrasena = /^(?=.*[A-Z])(?=.*\d{1,6})(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`-]).{8,}$/
    //if(patronContrasena.test(data.get('password'))) return setError('Contraseña inválida')

    // Validar que la contraseña tenga al menos 8 caracteres, una mayúscula, un número y un carácter especial
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (password.length > 20) {
      setError("La contraseña no puede tener más de 20 caracteres");
      return;
    }

    // Registrar al usuario con la URL de la imagen
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: data.get("name"),
        user_email: data.get("email"),
        user_phone: data.get("phone"),
        user_password: data.get("password"),
        user_image: imageUrl,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      setError(resData.error);
      return;
    } else {
      router.push("/auth/signin");
    }
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="md:px-6 lg:px-8 p-4">
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-4xl bg-gradient-to-r from-rose-400 to-purple-400 p-4 rounded-lg rounded-br-none rounded-bl-none">
        Regístrate
      </h2>
      <div className="grid place-items-center md:grid-cols-1 lg:gap-12">
        <div className="rounded-lg rounded-tr-none rounded-tl-none bg-white p-6 shadow-md md:p-8 lg:p-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground"
                >
                  Nombre
                </label>
                <Input
                  required
                  type="text"
                  id="name"
                  name="name"
                  placeholder="María José"
                  className="focus:ring-none mt-1 block w-full rounded-md bg-background px-3 py-2 text-foreground shadow-sm border-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground"
                >
                  Teléfono
                </label>
                <Input
                  required
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="8888 8888"
                  className="focus:ring-none mt-1 block w-full rounded-md bg-background px-3 py-2 text-foreground shadow-sm border-gray-400"
                />
                <span className="text-muted-foreground text-xs">
                  Utilizar el formato que se muestra
                </span>
              </div>
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
                  className="focus:ring-none mt-1 block w-full rounded-md bg-background px-3 py-2 text-foreground shadow-sm border-gray-400"
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type={showPassword ? "text" : "password"}
                    maxLength={20}
                    minLength={8}
                    id="password"
                    name="password"
                    placeholder="*****"
                    className="focus:ring-none mt-1 block w-full rounded-md bg-background px-3 py-2 text-foreground shadow-sm border-gray-400"
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
                {password.length < 8 && (
                  <p className="text-red-500 text-xs mt-1">
                    La contraseña debe tener al menos 8 caracteres
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-foreground"
                >
                  Imagen
                </label>
                <div className="relative mt-1 block w-full rounded-md bg-gradient-to-r from-rose-400 to-purple-400 p-[2px]">
                  <div className="flex items-center justify-center rounded">
                    <Input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className="block w-full rounded-md bg-white px-3 py-2 text-foreground shadow-sm focus:outline-none"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-md bg-gradient-to-r from-rose-400 to-purple-400 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-gradient-to-r hover:from-rose-300 hover:to-purple-300 md:px-12 md:text-base"
                >
                  Registrarse
                </Button>
              </div>
              {selectImage && (
                <div className="col-span-2">
                  <img
                    src={selectImage}
                    alt="Imagen seleccionada"
                    className="w-24 h-24 rounded-md object-cover"
                  />
                </div>
              )}

              {error && (
                <div className="col-span-2">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
            </div>
          </form>
          <div className="mt-6 flex gap-1 justify-start items-center">
            <p className="text-muted-foreground">¿Ya tienes cuenta?</p>
            <Link
              href="/auth/signin"
              className="underline text-rose-400 hover:text-rose-500 decoration-rose-400"
            >
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
