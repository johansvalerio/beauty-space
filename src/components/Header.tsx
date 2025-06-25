"use client";
import { useSession } from "next-auth/react";
import DropDown from "@/components/DropDown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home as HomeIcon,
  Scissors as ScissorsIcon,
  CalendarDays as CalendarIcon,
  Info as InfoIcon,
  X as XIcon,
  LogIn as LogInIcon,
  ChevronRightIcon,
} from "lucide-react";

const navItems = [
  {
    name: "Home",
    href: "/#hero",
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    name: "Servicios",
    href: "/#services",
    icon: <ScissorsIcon className="h-6 w-6" />,
  },
  {
    name: "Agendar",
    href: "/#contact",
    icon: <CalendarIcon className="h-6 w-6" />,
  },
  {
    name: "Info",
    href: "/#info",
    icon: <InfoIcon className="h-6 w-6" />,
  },
];

export default function Header() {
  const { data: session } = useSession();

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
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden relative group"
                aria-label="Menú principal"
              >
                <div className="flex flex-col items-center justify-center w-8 h-8">
                  <span
                    className={`block w-6 h-0.5 bg-pink-600 mb-1.5 transition-all duration-300 transform group-hover:translate-y-1 group-hover:rotate-45`}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-pink-600 mb-1.5 transition-opacity duration-300 opacity-100 group-hover:opacity-0`}
                  ></span>
                  <span
                    className={`block w-6 h-0.5 bg-pink-600 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:-rotate-45`}
                  ></span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-[320px] sm:max-w-[380px] bg-gradient-to-b from-pink-50 to-white p-0 overflow-hidden [&>button]:hidden"
            >
              <div className="h-full flex flex-col">
                {/* Logo y botón de cierre */}
                <div className="flex justify-between items-center p-6 border-b border-pink-100">
                  <a href="/" className="block">
                    <img
                      src="/img/logo3.PNG"
                      alt="xsbel studio logo"
                      className="h-16 w-auto"
                    />
                  </a>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-pink-600 hover:bg-pink-100 rounded-full"
                      aria-label="Cerrar menú"
                    >
                      <XIcon className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                </div>

                {/* Menú de navegación */}
                <nav className="flex-1 p-6 overflow-y-auto">
                  <ul className="space-y-6">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <SheetTrigger asChild>
                          <a
                            href={item.href}
                            className="flex items-center gap-4 p-3 rounded-xl text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors group"
                          >
                            <span className="text-pink-600 transition-transform group-hover:scale-110">
                              {item.icon}
                            </span>
                            <span className="text-lg font-medium">
                              {item.name}
                            </span>
                            <span className="ml-auto text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRightIcon className="h-5 w-5" />
                            </span>
                          </a>
                        </SheetTrigger>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Pie del menú */}
                <div className="p-6 border-t border-pink-100">
                  <Link
                    href="/auth/signin"
                    className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all"
                  >
                    <LogInIcon className="h-5 w-5 mr-1" />
                    Iniciar sesión
                  </Link>
                  <p className="mt-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Xsbel Studio. Todos los
                    derechos reservados.
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
    );
  }

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
              <DropDown />
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
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative group"
              aria-label="Menú principal"
            >
              <div className="flex flex-col items-center justify-center w-8 h-8">
                <span className="block w-6 h-0.5 bg-pink-600 mb-1.5 transition-all duration-300 transform group-hover:translate-y-1 group-hover:rotate-45"></span>
                <span className="block w-6 h-0.5 bg-pink-600 mb-1.5 transition-opacity duration-300 opacity-100 group-hover:opacity-0"></span>
                <span className="block w-6 h-0.5 bg-pink-600 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:-rotate-45"></span>
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-[320px] sm:max-w-[380px] bg-gradient-to-b from-pink-50 to-white p-0 overflow-hidden [&>button]:hidden"
          >
            <div className="h-full flex flex-col">
              {/* Logo y botón de cierre */}
              <div className="flex justify-between items-center p-6 border-b border-pink-100">
                <a href="/" className="block">
                  <img
                    src="/img/logo3.PNG"
                    alt="xsbel studio logo"
                    className="h-16 w-auto"
                  />
                </a>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-pink-600 hover:bg-pink-100 rounded-full"
                    aria-label="Cerrar menú"
                  >
                    <XIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
              </div>

              {/* Menú de navegación */}
              <nav className="flex-1 p-6 overflow-y-auto">
                <ul className="space-y-6">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <SheetTrigger asChild>
                        <a
                          href={item.href}
                          className="flex items-center gap-4 p-3 rounded-xl text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors group"
                        >
                          <span className="text-2xl text-pink-600 transition-transform group-hover:scale-110">
                            {item.icon}
                          </span>
                          <span className="text-lg font-medium">
                            {item.name}
                          </span>
                          <span className="ml-auto text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRightIcon className="h-5 w-5" />
                          </span>
                        </a>
                      </SheetTrigger>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Pie del menú */}
              <div className="p-6 border-t border-pink-100">
                <div className="flex flex-col items-center">
                  <DropDown />
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                  © {new Date().getFullYear()} Xsbel Studio. Todos los derechos
                  reservados.
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
