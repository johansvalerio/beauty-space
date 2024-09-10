export default function Header() {
    return (
        <header className="bg-white/90 shadow-sm sticky top-0 z-50 px-4">
            <nav className="container mx-auto py-3 md:py-4 flex justify-between items-center">
                <a href="/" className="flex gap-1 items-center">
                    <img src="/img/logo.png" alt="Beauty Space CR Logo" className="w-18 h-12" /></a>
                <ul className="flex space-x-4 ">
                    <li><a href="#services" className="text-gray-600 hover:text-pink-600">Servicios</a></li>
                    <li><a href="#contact" className="text-gray-600 hover:text-pink-600">Agendar</a></li>
                    <li><a href="#info" className="text-gray-600 hover:text-pink-600">Info</a></li>
                </ul>
            </nav>
        </header>
    )
}

