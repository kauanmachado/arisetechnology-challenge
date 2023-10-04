import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SearchRecipes from "./pages/SearchRecipes"
import RecipesByLetter from "./pages/RecipesByLetter"
import RecipesByIngredient from "./pages/RecipesByIngredient"
import RecipeDetails from "./pages/RecipeDetails"
import Ingredients from "./pages/Ingredients"

const Routers = () => {
    return (
        <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/pesquisar-receitas' element={<SearchRecipes/>}/>
        <Route path="/receitas-por-letra/:letter" element={<RecipesByLetter/>} />
        <Route path='/ingredientes' element={<Ingredients/>}/>
        <Route path='/ingredientes/:name' element={<RecipesByIngredient/>}/>
        <Route path='/detalhes-receita/:id' element={<RecipeDetails/>}/>
        </Routes>
        </BrowserRouter>
    )
}

export default Routers