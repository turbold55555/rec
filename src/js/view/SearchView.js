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
    elements.pageButtons.innerHTML = '';
}

export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, currentPage = 1, resPerPage =5) => {
    // Хайлтын үр дүнг хуудаслаж үзүүлэх
    //  page = 2 , start  = 10 , end 20
    const start = (currentPage-1) * resPerPage;
    const end = currentPage * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    //  Хуудаслалтын товчуудыг гаргаж ирэх.
    const totalPages  = Math.ceil(recipes.length / resPerPage);
    renderButtons(currentPage,totalPages );

};

const createButton = (
    page, 
    type,
    direction
    )=> `<button class="btn-inline results__btn--${type}" data-goto=${page}>
            <span>Хуудас ${page}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${direction}"></use>
            </svg>

</button>`;

const renderButtons = (currentPage, totalPages) => {
    let buttonHtml;
    if(currentPage ===1 && totalPages > 1){

    // 1-р хуудсан дээр байна , 2 -р хуудас гэдэг товчийг гаргана.
    buttonHtml = createButton(2,'next','right' );
    
    } else if (currentPage < totalPages){
        // Өмнөх болон дараачийн хуудас руу шилжих товчийг үзүүлнэ.
        buttonHtml = createButton(currentPage-1,'prev' , 'left');
        buttonHtml += createButton(currentPage+1,'next', 'right');
    } 
    
    else if(currentPage === totalPages){
        //  хамгийн сүүлийн хуудас дээр байна. Өмнөхрүү шилжүүлэх товчийг л  үзүүлнэ ээ.
        buttonHtml = createButton(currentPage-1,'prev','left');
    }
    elements.pageButtons.insertAdjacentHTML('afterbegin', buttonHtml);

};

