const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipecontainer = document.querySelector('.recipe-container');

//function to get recipes
const fetchRecipes = async (query) => {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=${query}')
    const response = await data.json();
     response.meal
   // console.log(response.meals[0]);
}

searchBtn.addEventListener('click' , ()=>{
    e.preventDefault();
    const searchInput = searchBox.ariaValueMax.trim();
    fetchRecipes(searchInput);
  //  console.log("Button clicked");
});