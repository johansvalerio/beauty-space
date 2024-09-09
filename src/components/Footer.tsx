import { Separator } from "@/components/ui/separator";
import { Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 p-4">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                        <div className="flex flex-col  gap-4">
                            <p className="text-gray-600">Cañas, Gte.</p>
                            <a href="https://wa.me/50688015998" target="_blank" className="flex gap-1 text-green-600 hover:text-green-400 font-semibold">WhatsApp<MessageCircle /></a>
                            <p className="text-gray-600">Email: isabelbe9266@gmail.com</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Sígueme en</h4>
                        <div className="flex  gap-4">
                            {/* <a href="#" className="text-gray-600 flex gap-1 items-center hover:text-pink-600">Facebook <Facebook /> </a> */}
                            <a href="https://www.instagram.com/beauty_space_cr/?hl=es" target="_blank" className="flex gap-1 items-center font-semibold text-pink-600 hover:text-pink-400">Instagram <Instagram /> </a>
                        </div>
                    </div>
                </div>
                <Separator className="my-8" />
                <p className="text-center text-gray-600">&copy; 2024 Beauty Space CR. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
} 