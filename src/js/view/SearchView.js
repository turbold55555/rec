import {elements} from './base';

// image_url: "http://forkify-api.herokuapp.com/images/steakhousepizza0b87.jpg"
// publisher: "The Pioneer Woman"
// publisher_url: "http://thepioneerwoman.com"
// recipe_id: "47000"
// social_rank: 99.99999981149679
// source_url: "http://thepioneerwoman.com/cooking/2011/09/steakhouse-pizza/"


//  Private Function 
const renderRecipe = recipe => {
    console.log(recipe);
    
    const markup = `<li>
    <a class="results__link " href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;

elements.searchResultList.insertAdjacentHTML('beforeend', markup);

};

export const clearSearchQuery = () => {
    elements.searchInput.value ='';
};
export const clearSearchResult = () => {
    elements.searchResultList.innerHTML = '';
}

export const getInput = () => elements.searchInput.value;
export const renderRecipes = recipes => {
    recipes.forEach(renderRecipe);
};