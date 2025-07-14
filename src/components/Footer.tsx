import { Separator } from "@/components/ui/separator";
import { Instagram, MessageCircle, MapPinIcon, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="info" className="bg-white mt-auto z-10 ">
      <div className="container mx-auto px-4 py-8 ">
        <div className="grid md:grid-cols-3 lg:justify-items-center gap-8  p-4">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-black">Contacto</h4>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <a
                  href="mailto:isabelbe9266@gmail.com"
                  className="text-gray-600 flex gap-1 items-center hover:text-gray-400 font-semibold underline underline-offset-2"
                >
                  {" "}
                  <Mail /> Email
                </a>
              </div>
              <div className="flex">
                <a
                  href="https://wa.me/50688015998"
                  target="_blank"
                  className="flex gap-1 items-center text-green-600 hover:text-green-400 font-semibold underline underline-offset-2"
                >
                  <MessageCircle /> WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-black">
              Sígueme en
            </h4>
            <div className="flex gap-4">
              {/* <a href="#" className="text-gray-600 flex gap-1 items-center hover:text-pink-600">Facebook <Facebook /> </a> */}
              <a
                href="https://www.instagram.com/xsbel.studio/?hl=es"
                target="_blank"
                className="flex gap-1 items-center font-semibold text-pink-600 hover:text-pink-400 underline underline-offset-2"
              >
                <Instagram />
                Instagram{" "}
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-black ">
              Ubicación GPS
            </h4>
            <div className="flex gap-4">
              <a
                href="https://maps.app.goo.gl/ev1UPxbUMjnhVSEX8"
                target="_blank"
                className="flex gap-1 items-center font-semibold text-blue-600 hover:text-blue-400  underline underline-offset-2 border-blue-600"
              >
                <MapPinIcon />
                Guanacaste, Cañas, Bello Horizonte
              </a>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-center text-gray-600">
          &copy; 2024 Xsbel Studio. Todos los derechos reservados.
        </p>
        <p className="text-center text-gray-600">
          Created by Ing.{" "}
          <a
            href="https://johansvalerio.vercel.app"
            target="_blank"
            className="text-gray-400 hover:text-gray-500 underline underline-offset-2"
          >
            Johans Valerio
          </a>
        </p>
      </div>
    </footer>
  );
}
