import Layout from "../components/Layout";
import { useEffect, useState } from "react"
import axios from "axios";
import Alphabet from "../components/Alphabet";
import Loading from "../components/Loading";
import Card from "../components/Card";

interface Recipe {
    idMeal: number;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
}

export default function RecipesByLetter() {


    const [clickedLetter, setClickedLetter] = useState('')
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchRecipes() {
            try {
                setLoading(true)
                setError(null)

                const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?f=${clickedLetter}`)
                console.log(clickedLetter)

                if (response.data.meals) {
                    setRecipes(response.data.meals)
                } else {
                    setRecipes([])
                }

                setLoading(false)
            } catch (error) {
                console.error("Erro ao buscar receitas com base na letra", error);
                setLoading(false);
            }
        }

        fetchRecipes()
    }, [clickedLetter])

    const handleLetterClick = (clickedLetter: string) => {
        setClickedLetter(clickedLetter);
    };

    return (
        <Layout>
            <div className="sm:p-16 p-8">
                <h1 className="text-4xl text-red-400 font-bold mb-8 sm:text-center">Receitas por letra</h1>
                <div className="flex flex-col gap-4 justify-center items-center text-1xl">


                    <Alphabet onLetterClick={handleLetterClick} />
                    


                </div>

                

                {recipes.length === 0 && !loading && !error && (
                    <p className="text-lg text-gray-400 text-1xl mt-16 text-center">
                        Nenhuma receita encontrada para a letra "{clickedLetter}".
                    </p>
                )}

                {recipes.length > 0 && (
                    <div className="mt-16">
                        {loading ? <Loading message="Carregando receitas..."/> : (<h2 className="text-3xl text-red-400 font-bold ">Resultados da pesquisa</h2>)}
                        
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-8">

                            {recipes.map((recipe, index) => (
                                <Card key={index} recipe={{
                                    id: recipe.idMeal,
                                    name: recipe.strMeal,
                                    image: recipe.strMealThumb,
                                    description: recipe.strInstructions,
                                    youtube: recipe.strYoutube
                                }} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}