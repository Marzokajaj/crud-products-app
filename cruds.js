let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let searchtitle = document.getElementById('search by title');
let searchcategory = document.getElementById('search by category');
let inputs = document.getElementsByTagName('input');
let tbody = document.getElementById('tbody');
let deletebtn = document.getElementById('deletebtn');
let createbtn = document.getElementById('createbtn');
let x ;
x=0;

search.value = '';

//btncreate
function btncreate(){
    if(x==0){
        console.log('khara');
        createbtn.innerHTML=`
        <button id="create" onclick="createproduct()">create</button>`;
        count.style.display='block';
        gettotal();
    }
};
btncreate();



//gettotal
function gettotal(){
    if(price.value != ''){
        let results = +price.value+ +taxes.value+ +ads.value+ -discount.value;
        total.innerText=results;
        total.style.background = '#040';
    }
    else{
        total.style.background = 'rgb(252, 19, 19)';
        total.innerText= " ";
    }
};



//create product and countproduct
let datastore ;
if(localStorage.getItem("prodact") != null){
    datastore = JSON.parse(localStorage.getItem("prodact"))
}else{
    datastore = [];
}
function createproduct(){
        if(title.value !='' && price.value != '' && category.value != ''){
            if(+count.value>+0 && +count.value<+100){
                for(i = 0 ; i < +count.value ; i++){
                    let data = {
                        title:title.value,
                        price:price.value,
                        taxes:taxes.value,
                        ads:ads.value,
                        discount:discount.value,
                        total:total.innerText,
                        count:count.value,
                        category:category.value,
                    }
                    datastore.push(data);
                    localStorage.setItem("prodact",JSON.stringify(datastore));
                }
            }
            clearinput();
            showdata();
        } 
    gettotal();
};



//clear inputs
function clearinput(){

    title.value = "" ;
    price.value = "" ;
    taxes.value = "" ;
    ads.value = "" ;
    discount.value = "" ;
    total.innerText = "" ;
    count.value = "" ;
    category.value = "" ;
};



//read(showdata)
function showdata(){
    let table = '';
    for(i=0 ; i < datastore.length ; i++){
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${datastore[i].title}</td>
            <td>${datastore[i].price}</td>
            <td>${datastore[i].taxes}</td>
            <td>${datastore[i].ads}</td>
            <td>${datastore[i].discount}</td>
            <td>${datastore[i].total}</td>
            <td>${datastore[i].category}</td>
            <td><button onclick="update(${i})">update</button></td>
            <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
        </tr>
        `  
    };
    tbody.innerHTML = table;
    create_delete_all_btn();
};
showdata();



//deletedata
function deletedata(i){
    datastore.splice(i,1);
    localStorage.setItem("prodact",JSON.stringify(datastore));
    showdata();
    create_delete_all_btn();
}



//create_delete_all_btn
function create_delete_all_btn(){
    if(datastore.length > 0){
        deletebtn.innerHTML = `<button onclick="deleteall()">Delete All (${datastore.length})</button>`;
    }
    else{
        deletebtn.innerHTML = ` `;
    }
};
create_delete_all_btn();



//deleteall
function deleteall(){
    datastore.splice(0,datastore.length);
    localStorage.clear();
    showdata();
}



//update
function update(i){
    console.log(x,i);
    title.value = datastore[i].title;
    price.value = datastore[i].price;
    taxes.value = datastore[i].taxes;
    ads.value = datastore[i].ads;
    discount.value = datastore[i].discount;
    gettotal();
    count.style.display = 'none';
    category.value = datastore[i].category;
    
    createbtn.innerHTML=`<button id="update">update</button>`;

    scroll({
        top:0,
        behavior:"smooth",
    })
    
    let updatebtn = document.getElementById('update');
    console.log(updatebtn);
    updatebtn.onclick=function updatedata(){
        if(x=1 && title.value !='' && price.value != '' && category.value != '' ){
            datastore[i] = {
                title:title.value,
                price:price.value,
                taxes:taxes.value,
                ads:ads.value,
                discount:discount.value,
                total:total.innerText,
                count:count.value,
                category:category.value,
            }
            localStorage.setItem("prodact",JSON.stringify(datastore));
            
        }
        x=0;
        showdata();
        clearinput();
        btncreate();
        console.log(0);
    } 
}


//getsearchmood
let searchmood = 'title';
function getsearchmood(id){
    if(id=='search by title'){
        searchmood = 'title';
        search.placeholder = 'search by title';
        console.log(searchmood);
    }else{
        searchmood = 'category';
        search.placeholder = 'search by category';
        console.log(searchmood);
    }
    search.focus();
    searchdata(search.value);
}



//searchdata
function searchdata(value){
    let table = '';
    if(searchmood == 'title'){
        for(i=0; i < datastore.length ; i++){
            if(datastore[i].title.toLowerCase().includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td id="titletable">${datastore[i].title}</td>
                    <td>${datastore[i].price}</td>
                    <td>${datastore[i].taxes}</td>
                    <td>${datastore[i].ads}</td>
                    <td>${datastore[i].discount}</td>
                    <td>${datastore[i].total}</td>
                    <td id="categorytable">${datastore[i].category}</td>
                    <td><button onclick="update(${i})">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>
                `  
                tbody.innerHTML = table;
            }
            else{
                tbody.innerHTML = table;
            }
        }
    }


    else{
        for(i=0; i < datastore.length ; i++){
            if(datastore[i].category.toLowerCase().includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i+1}</td>
                    <td>${datastore[i].title}</td>
                    <td>${datastore[i].price}</td>
                    <td>${datastore[i].taxes}</td>
                    <td>${datastore[i].ads}</td>
                    <td>${datastore[i].discount}</td>
                    <td>${datastore[i].total}</td>
                    <td>${datastore[i].category}</td>
                    <td><button onclick="update(${i})">update</button></td>
                    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                </tr>
                `  
                tbody.innerHTML = table;
                console.log(87878);
                let categorytable =document.getElementById('categorytable');
                //categorytable.style.background = 'black';
            }
            else{
                tbody.innerHTML = table;
            }
        }
    }
}