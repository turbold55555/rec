export default class Like{
    constructor(){
        this.readDataFromLocalStorage();
        if(!this.likes) this.likes = [];
    }
    addLike(id, title, publisher, img){
        const like = {id, title, publisher, img};
        this.likes.push(like);
        // storage руу хадгална аа
        this.saveDataToLocalStorage();
        return like;
    }
    deleteLike(id){
        //  id гэдэг ID-тай like -ийн индексийг массиваас хайж олно.
        const index = this.likes.findIndex(el =>el.id ===id );
        // Уг индекс дээрх элементийг массиваас устгана.
        this.likes.splice(index, 1);
        // this.items

        this.saveDataToLocalStorage();
    }

    isLiked(id){
            // if (this.likes.findIndex(el=> el.id === id) === -1) return false;
            // else return true;
            return this.likes.findIndex(el=> el.id === id) !== -1;

    }

    getNumberOFLikes(){
        return this.likes.length;
    }

    saveDataToLocalStorage(){
        localStorage.setItem('likes', JSON.stringify(this.likes));

    }
    readDataFromLocalStorage(){
        this.likes = JSON.parse(localStorage.getItem('likes'));
    }

}