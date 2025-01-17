const searchBox = document.querySelector('.searchBtn');
const input = document.querySelector(".SearchBox")
const recipecontainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
//console.log("hello",searchBox)
const receipeForm = document.querySelector(".form")

//function to get recipes
const fetchRecipes = async (query) => {  //we accessed through query variable
    recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    console.log(response)
   // console.log(response.meals[0]);

if (response.meals) {
    recipecontainer.innerHtml = ""; 
     response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipe');

        //create recipe card content
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span></p>
    `;
    const button = document.createElement('button');
    button.textContent = "view Recipe";
    recipeDiv.appendChild(button);

//Adding EventListner to recipe button
button.addEventListener('click', ()=>{
    openRecipePopup(meal);
})    
    recipecontainer.appendChild(recipeDiv);    
     });
    }else{
        recipecontainer.textContent = "No recipe found. please try another search."
    }
    //function to fetch ingredients and measurements.
    const fetchIngredients = (meal) => {
    //  console.log(meal);

    let ingredientsList = "";
    for(let i=1; i<=20; i++){
      const ingredient = meal[`strIngredient${i}`];
      if(ingredient){
        const measure = meal[`strMeasure${i}`];
        ingredientsList += `<li>${measure} ${ingredient}</li>`
      }
      else {
           break;
      }
    }
    return ingredientsList;
    }
    
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML =`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>  
    <div class="recipeInstructions">
    <h3>Instructions:</h3>
    <p >${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

}

recipeCloseBtn.addEventListener('click', ()=> { 
    recipeDetailsContent.parentElement.style.display = "none";
});
receipeForm.addEventListener('submit' , (e)=>{
    e.preventDefault()
    console.log("click")
    const searchInput = input.value.trim();// this will; give search box value.
    if(!searchInput) {
        recipecontainer.innerHTML = `<h2>Type the meal in the search box,</h2>`;
        return;
    }
    //console.log(searchInput)
    fetchRecipes(searchInput);
  //  console.log("Button clicked");

});