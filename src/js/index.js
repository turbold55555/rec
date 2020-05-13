require('@babel/polyfill');
import Search from './model/Search';
let search  = new Search('Strawberry');

search.doSearch().then( r=> console.log(r));