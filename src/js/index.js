require('@babel/polyfill');
import Search from './model/Search';
import {elements, renderLoader,clearLoader} from './view/base';
import * as searchView from './view/SearchView';
import Recipe from './model/Recipe';
import {renderRecipe, clearRecipe,hightLightSelectedRecipe} from './view/recipeView';
import List from './model/List';
import * as listView from './view/listView';
import Like from './model/Like' ;
import * as likesView  from './view/likesView';

/**
 *  web  app төлөв
 * - хайлтын Query, үр дүн
 * - Тухайн үзүүлж байгаа жор
 * - лайкалсан жорууд
 * - захиалсан байгаа жорын найрлаганууд
*/

const state = { };



const controlSearch = async () =>{
    console.log('дарагдлаа');
    //  1) вебээс хайлтын түлхүүр үгийг гаргаж авна.
    const query = searchView.getInput();
    if(query) {

    //  2) шинээр хайлтын обьектыг үүсгэж өгнө.
        state.search = new Search(query);

    //  3) хайлт хийхэд зориулж дэлгэцийн UI - ийг бэлтгэнэ.
    searchView.clearSearchQuery();
    searchView.clearSearchResult();
    renderLoader(elements.searchResultDiv);
    //  4) хайлтыг гүйцэтгэнэ.
        
          await state.search.doSearch();

    //  5) хайлтыг үр дүнг дэлгэцэнд үзүүлнэ.  
    clearLoader();
    if(state.search.result === undefined){
        alert('Хайлтаар илэрцгүй');
    }else
    searchView.renderRecipes(state.search.result, 2 , 5)
    // console.log(state.search.result); 

    }else {
         
            alert ('утга хоосон байна утга аа оруулна уу');
        
    }
    
}

elements.searchForm.addEventListener('submit', e=> {
    e.preventDefault();
    controlSearch();
});

 elements.pageButtons.addEventListener('click', e=> {
     const btn = e.target.closest('.btn-inline');
     if(btn){
        const gotoPageNumber = parseInt( btn.dataset.goto,10);
        searchView.clearSearchResult();
        searchView.renderRecipes(state.search.result, gotoPageNumber);
     }
     
});

const sda = new Recipe(47746);
sda.getRecipe();

const controlRecipe = async ()=>{
    // 1) URL -аас ID салгаж авна.
    const id = window.location.hash.replace('#','');
    
    

    //  URL дээр id байгаа эсэхийг шалгана.
    if(id){
         // console.log(id);
    // 2) Жорын моделыг үүсгэж өгнө.
    state.recipe = new Recipe(id);
    // 3) UI буюу дэлгэцийг бэлдпэнэ 
    clearRecipe();
    renderLoader(elements.recipeDiv);
    hightLightSelectedRecipe(id);
      
    // 4) Жороо татаж авч ирнэ 
    await state.recipe.getRecipe();
    // 5) Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно.
    clearLoader();
    state.recipe.calcTime();
    state.recipe.calcHuniiToo();
    // 6)  Жороо дэлгэцэнд гаргана.
    renderRecipe(state.recipe, state.likes.isLiked(id));

    }
   
}


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));
        window.addEventListener('load', e => {
    //  Шинээр лайк моделыг апп дөнгөж ачаалагдахад үүсгэгдэнэ.
    if (!state.likes) state.likes = new Like();

    //  Like Цэсийг Гаргах эсэхийг шийдэх
        likesView.toggleLikeMenu(state.likes.getNumberOFLikes());

        // Лайкууд байвал тэдгээрийг цэсэнд нэмж харуулна.
            state.likes.likes.forEach(like => likesView.renderLike(like));


} );
// Найрлаганы Controller 

const controlList = () => {
    // Найрлагны моделыг үүсгэнэ
    state.list = new List();

    // window.tt = state.list;

    //  Өмнө харагдаж байсан найрлагануудыг дэлгэцээс зайлуулна.
    listView.clearItems();
    //  Уг моделруу  одоо харагдаж байгаа жорны бүх найрлагыг авч хадгална 

        state.recipe.ingredients.forEach(n => {
            // тухайн найрлагыг модел руу хийнэ 
            const  item= state.list.addItem(n);
            //  Тухайн найрлагыг дэлгэцэнд гаргана
            listView.renderItem(item);
        });
};

//  likeController 
const controlLike = () => {
    //  1) Like ийн моделийг үүсгэнэ.
        if (!state.likes) state.likes = new Like();
    //  2)  Одоо харагдаж байгаа жорын Id -ийг олж авах
        const currentRecipeId = state.recipe.id;
    //  3) энэ жорыг Like-лсан эсэхийг шалгах
        if(state.likes.isLiked(currentRecipeId)){
            // Like-лсан бол лайкийг нь болиулна
            state.likes.deleteLike(currentRecipeId);
            //  like -ийн цэснээс устгана
            likesView.deleteLike(currentRecipeId);
            //  лайк товчны  лайкалсан байдлыг болиулах.
            likesView.toggleLikeBtn(false);

        }else {
            //  Лайклаагүй бол лайкийг нь хийнэ 
            console.log('Лайк хийгээгүй байна');
           
            const newLike = state.likes.addLike(
                 currentRecipeId, 
                 state.recipe.title,
                 state.recipe.publisher,
                 state.recipe.image_url
                 );
                //   Like цэсэнд энэ лайкыг  оруулах
        likesView.renderLike(newLike);

                 likesView.toggleLikeBtn(true);
        }

        likesView.toggleLikeMenu(state.likes.getNumberOFLikes());

};

elements.recipeDiv.addEventListener('click', e=> {
    if(e.target.matches('.recipe__btn , .recipe__btn *')){ 
    controlList();}
    else if (e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});


// btn-small recipe__btn

elements.shoppingList.addEventListener('click', e=> {
    //  клик хийсэн li элементийн data-itemid аттрибутыг шүүж гаргаж авах
    const id = e.target.closest('.shopping__item').dataset.itemid;

    //  олдсон id-тай орцыг моделоос устгана.

    state.list.deleteItem(id);

    //  Дэлгэцээс ийм Id - тай орцыг олж бас устгана.
    listView.deleteItem(id);
});