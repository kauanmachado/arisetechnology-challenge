import axios from "axios";
import Layout from "../components/Layout";
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

interface Recipe {
    idMeal: string,
    strMeal: string,
    strMealThumb: string,
}

export default function RecipesByIngredient() {

    const { name } = useParams()
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?i=${name}`)

                if (response.data && response.data.meals) {
                    const recipeData: Recipe[] = response.data.meals
                    setRecipes(recipeData);
                } else {
                    setRecipes([]);
                }

                setLoading(false)
            } catch (error) {
                console.error("Erro ao buscar receitas com base no ingrediente", error)
                setLoading(false)
            }
        }

        fetchRecipes()
    }, [name])

    return (
        <Layout>
            <div className="sm:p-16 p-8 flex flex-col">
                <h1 className="text-4xl text-red-400 font-bold mb-8">Receitas com {name}</h1>
                {loading && <Loading message="Carregando receitas..."/>}

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-8">
                    {recipes.map((recipe) => (
                        <div key={recipe.idMeal} className="bg-white rounded-lg p-4 shadow-lg hover:scale-105 transition-all">
                            <Link to={`../detalhes-receita/${recipe.idMeal}`}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-40 object-cover mt-2 rounded-lg" />
                            </Link>
                            <h3 className="text-xl font-semibold mt-4">{recipe.strMeal}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}