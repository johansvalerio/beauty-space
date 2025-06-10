import LoginForm from './components/LoginForm';
import useSession from '@/hooks/useSession';
import Particles from '@/components/Particles';

export default async function Signin() {
    const session = await useSession();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/background2.jpg')] bg-cover bg-no-repeat bg-center">

            <Particles />
            {!session ? (
                <LoginForm />
            ) : (
                <div className="rounded-lg bg-gradient-to-r from-rose-400 to-purple-400 p-6 shadow-md md:p-8 lg:p-10">
                    <h1 className="text-3xl text-white font-bold">Ya iniciaste sesión</h1>
                </div>
            )}
        </div>
    );
}
