'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('email'));
        console.log(data.get('password'));
        const res = await signIn('credentials', {
            redirect: false,
            email: data.get('email'),
            password: data.get('password'),
        });
        console.log(res);
        if (res?.error) {
            console.log('Error al iniciar sesión');
            setError(res.error);
            //alert(res.error);
        } else {
            console.log('Iniciando sesión');
            router.push('/');
            router.refresh();
        }
    }

    return (
        <div className="md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-4xl bg-gradient-to-r from-rose-400 to-purple-400 p-4 rounded-lg rounded-br-none rounded-bl-none">Iniciar Sesión</h2>
            <div className="grid place-items-center md:grid-cols-1 lg:gap-12">

                <div className="rounded-lg  rounded-tr-none rounded-tl-none bg-white p-6 shadow-md md:p-8 lg:p-10">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground">
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
                                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                                    Contraseña
                                </label>
                                <Input
                                    required
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="*****"
                                    className="focus:ring-none mt-1 block w-full rounded-md  bg-background px-3 py-2 text-foreground shadow-sm border-gray-400"
                                />
                            </div>
                            {error &&
                                <div className="col-span-2">
                                    <p className="text-red-500 text-sm">{error}</p>
                                </div>
                            }
                        </div>
                        <div className="mt-6">
                            <Button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-rose-400 to-purple-400 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-gradient-to-r hover:from-rose-300 hover:to-purple-300 md:px-12 md:text-base"
                            >
                                Iniciar Sesión
                            </Button>
                        </div>
                    </form>
                    <div className=' mt-6 flex gap-1 justify-end items-center'>
                        <p className='text-muted-foreground'>¿No tienes cuenta?</p>
                        <Link href='/auth/register' className="underline text-rose-400 decoration-rose-400">Regístrate</Link>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default LoginForm;
