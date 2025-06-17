import useSession from "@/hooks/useSession";
import DropDown from "@/components/DropDown";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default async function Header() {
  const session = await useSession();

  if (!session) {
    return (
      <header className="bg-white/90 shadow-sm sticky top-0 z-50 px-4">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="flex gap-1 items-center">
            <img
              src="/img/logo3.PNG"
              alt="xsbel studio logo"
              className="max-w-[100px] md:max-w-[150px] max-h-[100px] md:max-h-[150px]"
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-4 items-center text-base">
            <li>
              <a href="/#hero" className="text-gray-600 hover:text-pink-600">
                Home
              </a>
            </li>
            <li>
              <a
                href="/#services"
                className="text-gray-600 hover:text-pink-600"
              >
                Servicios
              </a>
            </li>
            <li>
              <a href="/#contact" className="text-gray-600 hover:text-pink-600">
                Agendar
              </a>
            </li>
            <li>
              <a href="/#info" className="text-gray-600 hover:text-pink-600">
                Info
              </a>
            </li>
            <Link
              href="/auth/signin"
              className="flex items-center gap-1 text-black hover:text-purple-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-login"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M21 12h-13l3 -3" />
                <path d="M11 15l-3 -3" />
              </svg>
              Sign in
            </Link>
          </ul>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-white"
            >
              <nav className="flex flex-col gap-4 mt-8 items-center">
                <a href="/" className="flex gap-1 items-center">
                  <img
                    src="/img/logo3.PNG"
                    alt="xsbel studio logo"
                    className="max-w-[150px] max-h-[150px]"
                  />
                </a>
                <a
                  href="/#hero"
                  className="text-gray-600 hover:text-pink-600 text-lg py-2"
                >
                  Home
                </a>
                <a
                  href="/#services"
                  className="text-gray-600 hover:text-pink-600 text-lg py-2"
                >
                  Servicios
                </a>
                <a
                  href="/#contact"
                  className="text-gray-600 hover:text-pink-600 text-lg py-2"
                >
                  Agendar
                </a>
                <a
                  href="/#info"
                  className="text-gray-600 hover:text-pink-600 text-lg py-2"
                >
                  Info
                </a>
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-2 text-black hover:text-purple-600 text-lg py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-login"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M21 12h-13l3 -3" />
                    <path d="M11 15l-3 -3" />
                  </svg>
                  Sign in
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: session?.user.email, // que el campo sea 'user_email'
    }),
  });

  const data = await res.json();
  const userimage = data?.user_image;

  return (
    <header className="bg-white/90 shadow-sm sticky top-0 z-50 px-4">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex gap-1 items-center">
          <img
            src="/img/logo3.PNG"
            alt="xsbel studio logo"
            className="max-w-[100px] md:max-w-[150px] max-h-[100px] md:max-h-[150px]"
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li>
            <a href="/#hero" className="text-gray-600 hover:text-pink-600">
              Home
            </a>
          </li>
          <li>
            <a href="/#services" className="text-gray-600 hover:text-pink-600">
              Servicios
            </a>
          </li>
          <li>
            <a href="/#contact" className="text-gray-600 hover:text-pink-600">
              Agendar
            </a>
          </li>
          <li>
            <a href="/#info" className="text-gray-600 hover:text-pink-600">
              Info
            </a>
          </li>
          {session ? (
            <li>
              <DropDown session={session} userimage={userimage} />
            </li>
          ) : (
            <Link
              href="/auth/signin"
              className="flex items-center gap-1 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-login"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M21 12h-13l3 -3" />
                <path d="M11 15l-3 -3" />
              </svg>
              Sign in
            </Link>
          )}
        </ul>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] bg-white"
          >
            <nav className="flex flex-col gap-4 mt-8 items-center">
              <a href="/" className="flex gap-1 items-center">
                <img
                  src="/img/logo3.PNG"
                  alt="xsbel studio logo"
                  className="max-w-[150px] max-h-[150px]"
                />
              </a>
              <a
                href="/#hero"
                className="text-gray-600 hover:text-pink-600 text-lg py-2"
              >
                Home
              </a>
              <a
                href="/#services"
                className="text-gray-600 hover:text-pink-600 text-lg py-2"
              >
                Servicios
              </a>
              <a
                href="/#contact"
                className="text-gray-600 hover:text-pink-600 text-lg py-2"
              >
                Agendar
              </a>
              <a
                href="/#info"
                className="text-gray-600 hover:text-pink-600 text-lg py-2"
              >
                Info
              </a>
              {session ? (
                <div className="py-2">
                  <DropDown session={session} userimage={userimage} />
                </div>
              ) : (
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-2 text-black text-lg py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-login"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M21 12h-13l3 -3" />
                    <path d="M11 15l-3 -3" />
                  </svg>
                  Sign in
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
