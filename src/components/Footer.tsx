import { Separator } from "@/components/ui/separator";
import { Instagram, MessageCircle, MapPinIcon, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8 p-4">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                        <div className="flex flex-col gap-4">

                            <div className="flex">
                                <a href="mailto:isabelbe9266@gmail.com" className="text-gray-600 flex gap-1 items-center hover:text-gray-400 font-semibold"> <Mail /> Email</a>
                            </div>
                            <div className="flex">
                                <a href="https://wa.me/50688015998" target="_blank" className="flex gap-1 items-center text-green-600 hover:text-green-400 font-semibold"><MessageCircle /> WhatsApp</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Sígueme en</h4>
                        <div className="flex  gap-4">
                            {/* <a href="#" className="text-gray-600 flex gap-1 items-center hover:text-pink-600">Facebook <Facebook /> </a> */}
                            <a href="https://www.instagram.com/beauty_space_cr/?hl=es" target="_blank" className="flex gap-1 items-center font-semibold text-pink-600 hover:text-pink-400"><Instagram />Instagram  </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Ubicación</h4>
                        <div className="flex  gap-4">
                            <a href="https://maps.app.goo.gl/ev1UPxbUMjnhVSEX8" target="_blank" className="flex gap-1 items-center font-semibold text-blue-600 hover:text-blue-400"><MapPinIcon />Provincia de Guanacaste, Cañas, Bello Horizonte</a>
                        </div>
                    </div>
                </div>
                <Separator className="my-8" />
                <p className="text-center text-gray-600">&copy; 2024 Beauty Space CR. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
} 