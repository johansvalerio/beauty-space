import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8 p-4">
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                        <p className="text-gray-600">Cañas, Gte.</p>
                        <p className="text-gray-600">Teléfono: (506) 8801 5998</p>
                        <p className="text-gray-600">Email: isabelbe9266@gmail.com</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Sígueme en</h4>
                        <div className="flex  gap-4">
                            <a href="#" className="text-gray-600 flex gap-1 items-center hover:text-pink-600">Facebook <Facebook /> </a>
                            <a href="#" className="text-gray-600 flex gap-1 items-center hover:text-pink-600">Instagram <Instagram /> </a>
                        </div>
                    </div>
                </div>
                <Separator className="my-8" />
                <p className="text-center text-gray-600">&copy; 2024 Beauty Space CR. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
} 