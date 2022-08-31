const additem = function(item , price){

    let myobj_str = localStorage.getItem('webapipro');
    if(myobj_str){
        let myobj = JSON.parse(myobj_str);
        if(myobj[item]);
        else myobj[item]='0';
        myobj[item] = ( parseInt(myobj[item]) + 1 ).toString();
        localStorage.setItem('webapipro',JSON.stringify(myobj));
    }
    else{
        let myobj = {};
        myobj[item] = '1';
        localStorage.setItem('webapipro',JSON.stringify(myobj));
    }

    //
    let current_item_element = document.querySelector(`#${item}prod`);
    current_item_element.innerHTML = ( parseInt(current_item_element.innerHTML) + 1 ).toString();
    let total_item_element =document.querySelector('#totalprod');
    total_item_element.innerHTML = ( parseInt(total_item_element.innerHTML) + 1 ).toString();
    let total_price =document.querySelector('#totalprice');
    total_price.innerHTML = ( parseInt(total_price.innerHTML) + price ).toString();
}

const removeitem = function(item , price){
    let myobj_str = localStorage.getItem('webapipro');
    if(myobj_str){
        let myobj = JSON.parse(myobj_str);
        if(myobj[item]){
            if(parseInt(myobj[item] ) > 0){
                myobj[item] = ( parseInt(myobj[item]) - 1 ).toString();
                let current_item_element = document.querySelector(`#${item}prod`);
                current_item_element.innerHTML = ( parseInt(current_item_element.innerHTML) - 1 ).toString();
                let total_item_element =document.querySelector('#totalprod');
                total_item_element.innerHTML = ( parseInt(total_item_element.innerHTML) - 1 ).toString();
                let total_price =document.querySelector('#totalprice');
                total_price.innerHTML = ( parseInt(total_price.innerHTML) - price ).toString();
            }
            localStorage.setItem('webapipro',JSON.stringify(myobj));
        }
    }
}