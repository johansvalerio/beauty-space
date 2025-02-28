import RegisterForm from "./components/RegisterForm"
import Particles from '@/components/Particles';

function Register() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/background2.jpg')] bg-cover bg-no-repeat bg-center ">
            <Particles />
            <RegisterForm />
        </div>
    )
}

export default Register