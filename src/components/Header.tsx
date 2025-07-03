"use client";
import { useSession } from "next-auth/react";
import DropDown from "@/components/DropDown";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home as HomeIcon,
  CalendarDays as CalendarIcon,
  Info as InfoIcon,
  X as XIcon,
  LogIn as LogInIcon,
  ChevronRightIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import NailPolishIcon from "@/svg/NailPolishIcon";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  {
    name: "Home",
    href: "/#hero",
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    name: "Servicios",
    href: "/#services",
    icon: <NailPolishIcon className="h-6 w-6" />,
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
  const [isScrolled, setIsScrolled] = useState(false);

  // Si baja el scroll más de 50px, cambia el estado isScrolled
  // para aplicar estilos al header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!session) {
    return (
      <header
        className={cn(
          "sticky top-0 w-full z-50 transition-all duration-300 px-4",
          isScrolled
            ? "bg-background/80 dark:bg-background/90 backdrop-blur-lg border-b border-border/40"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/" className="flex gap-1 items-center">
            <img
              src="/img/logo3.PNG"
              alt="xsbel studio logo"
              className="max-w-[100px] md:max-w-[150px] max-h-[100px] md:max-h-[150px]"
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 items-center font-semibold">
            {navItems.map((item) => (
              <li
                key={item.name}
                className="hover:scale-105 transition-transform duration-200"
              >
                <a
                  href={item.href}
                  className="flex items-center gap-2 dark:text-white text-black text-foreground hover:text-primary transition-colors duration-200"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
            <li className="hover:scale-105 transition-transform duration-200">
              <ThemeToggle />
            </li>
            <li className="hover:scale-105 transition-transform duration-200">
              <Link
                href="/auth/signin"
                className="flex items-center gap-1 dark:text-white text-black text-foreground hover:text-primary transition-all duration-300"
              >
                <LogInIcon className="h-6 w-6" />
                Sign in
              </Link>
            </li>
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
                    <li>
                      <div className="flex items-center p-3 rounded-xl hover:bg-pink-50 hover:text-pink-600 transition-colors group">
                        <ThemeToggle showLabel={true} />
                      </div>
                    </li>
                  </ul>
                </nav>

                {/* Pie del menú */}
                <div className="p-6 border-t border-pink-100">
                  <Link
                    href="/auth/signin"
                    className="flex hover:scale-105 duration-300 items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all"
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
    <header
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-300 px-4",
        isScrolled
          ? "bg-background/80 dark:bg-background/90 backdrop-blur-lg border-b border-border/40"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex gap-1 items-center">
          <img
            src="/img/logo3.PNG"
            alt="xsbel studio logo"
            className="max-w-[100px] md:max-w-[150px] max-h-[100px] md:max-h-[150px]"
          />
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 items-center font-semibold">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="hover:scale-105 transition-transform duration-200"
            >
              <a
                href={item.href}
                className="flex items-center gap-2 dark:text-white text-black transition-colors duration-200"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </a>
            </li>
          ))}
          <li className="hover:scale-105 transition-transform duration-200">
            <ThemeToggle showLabel={false} />
          </li>
          {session ? (
            <li className="hover:scale-105 transition-transform duration-200">
              <DropDown />
            </li>
          ) : (
            <li className="hover:scale-105 transition-transform duration-200">
              <Link
                href="/auth/signin"
                className="flex items-center gap-2 px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-full transition-all duration-300 hover:scale-105"
              >
                <LogInIcon className="h-5 w-5" />
                <span>Sign in</span>
              </Link>
            </li>
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
                  <li>
                    <div className="flex items-center p-3 rounded-xl hover:bg-pink-50 hover:text-pink-600 transition-colors group">
                      <ThemeToggle showLabel={true} />
                    </div>
                  </li>
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
