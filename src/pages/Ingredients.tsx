import axios from "axios";
import Layout from "../components/Layout";
import { useState, useEffect } from "react"
import Loading from "../components/Loading";
import Ingredient from "../components/Ingredient";

interface Ingredient {
    idIngredient: number,
    strIngredient: string
}

export default function Ingredients() {

    const [searchText, setSearchText] = useState('')
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [originalIngredients, setOriginalIngredients] = useState<Ingredient[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true)
                setError(null)


                const response = await axios.get(`https://themealdb.com/api/json/v1/1/list.php?i=list`)

                if (response.data.meals) {
                    const ingredientData: Ingredient[] = response.data.meals.map(
                        (ingredient: any) => ({
                            idIngredient: ingredient.idIngredient,
                            strIngredient: ingredient.strIngredient,
                        })
                    )
                    setIngredients(ingredientData)
                    setOriginalIngredients(ingredientData)
                    
                } else {
                    setIngredients([])
                    setOriginalIngredients([])
                }
                setLoading(false)
            } catch (error) {
                console.error("Erro ao buscar receitas com base na letra", error)
                setLoading(false)
            }
        }

        fetchIngredients()
    }, [])

    useEffect(() => {
        const filtered = originalIngredients.filter((ingredient) =>
            ingredient.strIngredient.toLowerCase().includes(searchText.toLowerCase())
        );
    
            setIngredients(filtered)
    }, [searchText, originalIngredients]);

    return (
        <Layout>
            <div className="sm:p-16 p-8 flex flex-col">
                <h1 className="text-4xl text-red-400 font-bold mb-8">Ingredientes</h1>
                <input
                    type="text"
                    placeholder="Procure por ingredientes"
                    className="mb-8 border border-gray-100 shadow-lg h-[80px] w-full rounded-lg p-2 focus:outline-none focus:ring focus:border-red-300"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                {loading && <Loading message="Carregando ingredientes..."/>}

                {ingredients.length === 0 && !loading && !error && (
                    <p className="text-lg text-gray-400 text-1xl mt-16 text-center">Nenhum ingrediente encontrado.</p>
                )}

                {ingredients.length > 0 && (
                    <div className="mt-16">
                    
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">

                        {ingredients.map((ingredient, index) => (
                            <Ingredient key={index} ingredient={{
                                id: ingredient.idIngredient,
                                name: ingredient.strIngredient,
                            }} />
                        ))}
                    </div>
                </div>
                )}
            </div>
        </Layout>
    )
}