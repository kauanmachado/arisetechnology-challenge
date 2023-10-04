import { Link } from "react-router-dom";

interface Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
    youtube: string
}

interface CardProps {
    recipe: Recipe;
}

export default function Card({ recipe }: CardProps) {

    return (

        <div className="col-span-1 h-auto bg-red-50 hover:scale-105 transition-all rounded-xl p-5 shadow-lg">
            <Link to={`../detalhes-receita/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.name} className="w-full h-[300px] rounded-xl" />
            </Link>
            <h3 className="mt-5 font-bold text-3xl text-red-600">{recipe.name}</h3>
            <p className="">
                {recipe.description.length > 300
                    ? `${recipe.description.slice(0, 300)}...`
                    : recipe.description}
            </p>

            <Link to={recipe.youtube} target="_blank">
            <button
                className="bg-red-500 hover:bg-red-400 transition-all p-4 rounded-xl text-white mt-4"
            >
                YouTube
            </button>
            </Link>
        </div>
    )
}