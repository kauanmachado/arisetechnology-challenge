import axios from "axios";
import Layout from "../components/Layout";
import { useState, useEffect } from "react"
import Loading from "../components/Loading";
import Card from "../components/Card";

interface Recipe {
    idMeal: number;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
}

export default function SearchRecipes() {

    const [searchText, setSearchText] = useState('')
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchRecipes() {
            try {
                setLoading(true)
                setError(null)

                const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${searchText}`)

                if (response.data.meals) {
                    setRecipes(response.data.meals)
                } else {
                    setRecipes([])
                }

                setLoading(false)
            } catch (error) {
                console.error('Erro ao buscar receitas com base na sua pesquisa', error)
                setLoading(false)
            }
        }

        fetchRecipes()
    }, [searchText])

    return (
        <Layout>
            <div className="sm:p-16 p-8 flex flex-col">
                <h1 className="text-4xl text-red-400 font-bold mb-8">Procure receitas pelo nome</h1>
                <input
                    type="text"
                    placeholder="Procure por receitas"
                    className="mb-12 border border-gray-100 shadow-lg h-[80px] w-full rounded-lg p-2 focus:outline-none focus:ring focus:border-red-300"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                
                {loading && <Loading message="Carregando receitas..."/>}

                {recipes.length === 0 && !loading && !error && (
                    <p className="text-lg text-gray-400 text-1xl mt-16 text-center">
                        Nenhuma receita encontrada para "{searchText}".
                    </p>
                )}

                {recipes.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-3xl text-red-400 font-bold mb-8">Resultados da pesquisa</h2>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">

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