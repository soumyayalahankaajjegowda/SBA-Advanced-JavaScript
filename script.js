const searchBox = document.querySelector('.searchBtn');
const input = document.querySelector(".SearchBox")
const recipecontainer = document.querySelector('.recipe-container');
console.log("hello",searchBox)

//function to get recipes
const fetchRecipes = async (query) => {  //we accessed through query variable
    recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    console.log(response)
   // console.log(response.meals[0]);
if (response.meals) {
    recipecontainer.innerHtml = ""; // clear previous results
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
    recipecontainer.appendChild(recipeDiv);    
     });

}
}
searchBox.addEventListener('click' , ()=>{
 
    console.log("click")
    const searchInput = input.value.trim();// this will; give search box value.
    console.log(searchInput)
    fetchRecipes(searchInput);
  //  console.log("Button clicked");

});