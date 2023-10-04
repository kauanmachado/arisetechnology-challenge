import Card from "../components/Card"
import Layout from "../components/Layout"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from "../components/Loading";

interface Recipe {
    idMeal: number;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
}

export default function Home() {

    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRandomRecipes() {

            const randomRecipes: Recipe[] = [];

            for (let i = 0; i < 10; i++) {
                try {
                    const response = await axios.get(
                        'https://themealdb.com/api/json/v1/1/random.php'
                    );
                    const data = response.data.meals as Recipe[];
                    if (data && data.length > 0) {
                        randomRecipes.push(data[0]);
                    }
                } catch (error) {
                    console.error('Erro ao buscar receitas:', error);
                }
            }

            setRecipes(randomRecipes)
            setLoading(false)
        }

        fetchRandomRecipes()
    }, [])

    return (
        <Layout>
            <div className="sm:p-16 p-8 ">
                <h1 className="text-4xl text-red-400 font-bold mb-8 flex flex-wrap gap-8">Receitas Aleatórias</h1>

                {loading ? (
                    <Loading message="Carregando receitas..."/>

                ) : (
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
                )}



            </div>
        </Layout>
    )
}
