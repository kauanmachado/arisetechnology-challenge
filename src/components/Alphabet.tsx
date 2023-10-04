import { Link } from "react-router-dom";

interface AlphabetProps {
    onLetterClick: (letter: string) => void;
}

export default function Alphabet({ onLetterClick }: AlphabetProps) {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return (
        <div className="flex flex-wrap gap-4 justify-center items-center text-2xl">
            {alphabet.map((letter, index) => (
                <Link
                    key={index}
                    to={`/receitas-por-letra/${letter}`}
                    className="w-3 h-3 flex hover:text-red-500 hover:scale-150 transition-all"
                    onClick={() => onLetterClick(letter)}
                >
                    {letter}
                </Link>
            ))}
        </div>
    )
}