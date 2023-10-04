import axios from "axios";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import CardDetails from "../components/CardDetails";

interface Recipe {
    idMeal: number;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube: string;
    strCategory: string;
    strArea: string;
    strTags: string;
    strSource: string,
    ingredients: string[];
    measures: string[];
}

interface RecipeDetail extends Recipe{
    strIngredient1: string | null;
    strIngredient2: string | null;
    strIngredient3: string | null;
    strIngredient4: string | null;
    strIngredient5: string | null;
    strIngredient6: string | null;
    strIngredient7: string | null;
    strIngredient8: string | null;
    strIngredient9: string | null;
    strIngredient10: string | null;
    strIngredient11: string | null;
    strIngredient12: string | null;
    strIngredient13: string | null;
    strIngredient14: string | null;
    strIngredient15: string | null;
    strIngredient16: string | null;
    strIngredient17: string | null;
    strIngredient18: string | null;
    strIngredient19: string | null;
    strIngredient20: string | null;

    strMeasure1: string | null;
    strMeasure2: string | null;
    strMeasure3: string | null;
    strMeasure4: string | null;
    strMeasure5: string | null;
    strMeasure6: string | null;
    strMeasure7: string | null;
    strMeasure8: string | null;
    strMeasure9: string | null;
    strMeasure10: string | null;
    strMeasure11: string | null;
    strMeasure12: string | null;
    strMeasure13: string | null;
    strMeasure14: string | null;
    strMeasure15: string | null;
    strMeasure16: string | null;
    strMeasure17: string | null;
    strMeasure18: string | null;
    strMeasure19: string | null;
    strMeasure20: string | null;
}


export default function RecipeDetails() {

    const { id } = useParams()
    const [recipeDetail, setRecipeDetail] = useState<RecipeDetail | null>(null)

    useEffect(() => {
        async function fetchRecipeDetails(){
            try {
                const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                const data = response.data.meals[0]
                setRecipeDetail(data)
                console.log(recipeDetail)
            } catch (error) {
                console.error('Erro ao buscar detalhes da receita:', error)
            }
            
        }

        fetchRecipeDetails()
    },[])

    function getIngredients(recipe: RecipeDetail) {
        const ingredients = [];
        for (let i: number = 1; i <= 20; i++) {
          const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetail];
          if (ingredient && typeof ingredient === 'string' && ingredient.trim() !== '') {
            ingredients.push(ingredient);
          }
        }
        return ingredients;
      }
    
      function getMeasures(recipe: RecipeDetail){
        const measures = []
        for (let i: number = 1; i <= 20; i++){
            const measure = recipe[`strMeasure${i}` as keyof RecipeDetail]
            if (measure && typeof measure === 'string' && measure.trim() !== '') {
                measures.push(measure);
              }
        }

        return measures;
      }

    return (
        <Layout>
           <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 justify-center items-center relative min-h-screen">
                {recipeDetail && (
                    <CardDetails recipe={{
                        id: recipeDetail.idMeal,
                        name: recipeDetail.strMeal,
                        image: recipeDetail.strMealThumb,
                        description: recipeDetail.strInstructions,
                        youtube: recipeDetail.strYoutube,
                        category: recipeDetail.strCategory,
                        area: recipeDetail.strArea,
                        tags: recipeDetail.strTags,
                        source: recipeDetail.strSource,
                        ingredients: getIngredients(recipeDetail),
                        measures: getMeasures(recipeDetail)

                        
                    }}/>
                )}
                
            </div> 
        </Layout>
    )
}