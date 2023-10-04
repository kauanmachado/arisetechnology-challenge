import { Link } from 'react-router-dom'
import '../index.css'
import { useState } from 'react';
import { GrClose } from 'react-icons/gr'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="relative min-h-screen">
            <header>
                <div className="h-[150px]  p-4 sm:p-16 flex flex-col sm:flex-row justify-between font-bold">
                    <div className="relative text-left mb-4 sm:mb-0">
                        <Link to="/">
                        <h1 className=" text-4xl text-red-400">RecipeAPP</h1>
                        </Link>
                        <button
                            onClick={toggleMenu}
                            className="absolute block lg:hidden text-red-400 mt-3 sm:mt-0 text-4xl"
                        >
                            &#9776;
                        </button>
                    </div>
                    <div className="text-center sm:text-right">

                        <ul className={`${menuOpen ? 'flex flex-col md:text-2xl items-center fixed inset-0 bg-white w-full h-auto align-center p-4 bg-red-50' : 'hidden'
                            } lg:flex flex-wrap justify-center xl:justify-end gap-4 menu text-red-400`}>
                            <button
                                onClick={toggleMenu}
                                className="absolute top-4 right-4 lg:hidden text-red-400"
                            >
                                <GrClose size={30} className="text-red-400"/>
                            </button>
                            <Link to="/">
                                <li className=" hover:bg-red-100 rounded-xl transition-all p-4">Início</li>
                            </Link>
                            <Link to="/pesquisar-receitas">
                                <li className=" hover:bg-red-100 rounded-xl transition-all p-4">Pesquisar receitas</li>
                            </Link>
                            <Link to="/receitas-por-letra/:letter">
                                <li className=" hover:bg-red-100 rounded-xl transition-all p-4">Receitas por letra</li>
                            </Link>
                            <Link to="/ingredientes">
                                <li className="hover:bg-red-100 rounded-xl transition-all p-4">Receitas por ingredientes</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </header>

            <main>
                {children}
            </main>

            <footer className="">

            </footer>


        </div>
    )
}