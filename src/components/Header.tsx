export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 px-4">
            <nav className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-lg md:text-2xl font-bold text-pink-300"><a href="/">Beauty Space CR</a></h1>
                <ul className="flex space-x-4 ">
                    <li><a href="#services" className="text-gray-600 hover:text-pink-600">Services</a></li>
                    <li><a href="#contact" className="text-gray-600 hover:text-pink-600">Contact</a></li>
                </ul>
            </nav>
        </header>
    )
}

