import { Link } from "react-router-dom"

interface Ingredient {
    id: number,
    name: string
}

interface IngredientProps {
    ingredient: Ingredient
}

export default function Ingredient({ ingredient } : IngredientProps){

    return(
        <Link to={`${ingredient.name}`}>
        <div className="col-span-1 h-auto hover:scale-105 transition-all rounded-xl p-5 shadow-lg">
            <h2 className="text-2xl font-bold">{ingredient.name}</h2>
        </div>
        </Link>
    )   
}