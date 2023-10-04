import { Link } from "react-router-dom";

interface Recipe {
    id: number;
    name: string;
    description: string;
    image: string;
    youtube: string,
    category: string,
    area: string,
    tags: string,
    source: string,
    ingredients: string[],
    measures: string[],
}

interface CardProps {
    recipe: Recipe;
}

export default function CardDetails({ recipe }: CardProps) {



    return (
        <>
        <div className="col-span-1"></div>
        <div className="col-span-2 border-red-300 h-auto bg-red-50  rounded-xl md:p-12 p-4 shadow-lg my-8 flex flex-col items-center justify-center">
            <h3 className="mb-3 font-bold text-5xl text-red-600 ">{recipe.name}</h3>
            <Link to={recipe.image} className="w-full" target="_blank">
                <img src={recipe.image} alt={recipe.name} className="w-full  rounded-xl " />
            </Link>
            <div className="flex flex-col mt-4 justify-center gap-3">
                <p className="text-2xl font-bold"><span className="text-red-500">Categoria: </span>{recipe.category}</p>
                <p className="text-2xl font-bold"><span className="text-red-500">Area: </span>{recipe.area}</p>
                <p className="text-2xl font-bold"><span className="text-red-500">Tags: </span>{recipe.tags}</p>
            </div>
            <p className="mt-8 text-lg mb-8">
                {recipe.description}
            </p>

            <div className="flex flex-wrap text-center justify-evenly gap-4">
                <div className="">
                    <h2 className="text-3xl font-bold text-red-500">
                        Ingredientes
                    </h2>
                    <ul className="gap-4 text-lg mt-3 text-center">
                        {recipe.ingredients.map((ingredient: string, index) => (
                            <li key={index} className="font-bold">{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="">
                    <h2 className="text-3xl font-bold text-red-500">
                        Medidas
                    </h2>
                    <ul className="gap-4 text-lg mt-3 text-center">
                        {recipe.measures.map((measure: string, index) => (
                            <li key={index} className="font-bold">{measure}</li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className="flex  flex-row justify-center items-center gap-4 mt-8 ">
                <Link to={recipe.youtube} target="_blank">
                    <button
                        className="bg-red-500 hover:bg-red-400 transition-all p-4 rounded-xl text-white mt-4 "
                    >
                        YouTube
                    </button>
                </Link>
                <Link to={recipe.source} className="hover:text-gray-400 " target="_blank">
                    <p className="underline font-bold text-lg items-center  align-middle">Fonte Original</p>
                </Link>
            </div>
        </div>
        <div className="col-span-1"></div>
        </>
    )
}