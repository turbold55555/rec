require('@babel/polyfill');
import Search from './model/Search';

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
    const query = 'pizza';
    if(query) {



    //  2) шинээр хайлтын обьектыг үүсгэж өгнө.
        state.search = new Search(query);

    //  3) хайлт хийхэд зориулж дэлгэцийн UI - ийг бэлтгэнэ.

    //  4) хайлтыг гүйцэтгэнэ.
        
          await state.search.doSearch();

    //  5) хайлтыг үр дүнг дэлгэцэнд үзүүлнэ.  
    console.log(state.search.result); 


    }else {
         
            alert ('утга хоосон байна утга аа оруулна уу');
        
    }
    
}

document.querySelector('.search').addEventListener('submit', e=> {
    e.preventDefault();
    controlSearch();
});