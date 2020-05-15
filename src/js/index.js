require('@babel/polyfill');
import Search from './model/Search';
import {elements, renderLoader,clearLoader} from './view/base';
import * as searchView from './view/SearchView';
import Recipe from './model/Recipe';


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