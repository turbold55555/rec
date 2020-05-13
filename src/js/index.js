const arr = [23,14,44,123];

let  myfunc = a => {
    
    console.log(` Тоо бол: ${a}`);
} ;

const arr1 = [... arr, 111 ,222];

myfunc(arr1[1]);