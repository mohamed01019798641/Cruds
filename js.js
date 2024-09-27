let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let totel = document.getElementById('totel');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');





let mood = 'Create';

let tmp;




//get total
function getTotal()
{
    if(price.value != ''){
        result =(+price.value + +taxes.value+ +ads.value)- +discount.value;
        totel.innerHTML=result;
        totel.style.background='#040';
    }else{
        totel.innerHTML='';
        totel.style.background='#a00d02';
    }
}







// create prodact
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = [];
}


submit.onclick = function(){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        totel:totel.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),


    }

     if(title.value != "" && price.value !='' && category.value!='' && newpro.count<101 ){

      
         
        
        if(mood === 'Create'){
            if(newpro.count>1){
                for(let i=0; i < newpro.count; i++){
                    datapro.push(newpro);
                }
        
              }else{
                datapro.push(newpro)
              }


        }else{
            datapro[tmp]= newpro;
            mood ='Create';
            submit.innerHTML='create';
            count.style.display='block'

        }
        cleardata()
     }


      

      
    

 //save localStorage

    localStorage.setItem('product', JSON.stringify(datapro))
   
   
    showdata()
}













//clear input
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    totel.innerHTML='';
    count.value='';
    category.value='';

}




//red
function showdata(){
    getTotal()
   let table = '';
   for(let i=0; i<datapro.length; i++){
    table += `
     <tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].totel}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick ="updatedata(${i})" id="update">update</button></td>
                        <td><button onclick ='deletedata(${i})' id="delete">delete</button></td>
                    </tr>
    
    
    `;
   }
   
   
 document.getElementById('tbody').innerHTML = table;
 let btndelet = document.getElementById('deleteAll');
 if(datapro.length > 0){
    btndelet.innerHTML=`
     <button onclick='deleteAll()' >delete All  ${datapro.length}</button>
    ` 

 }else{
    btndelet.innerHTML='';
 }

}

showdata()









//delete

function deletedata(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);

    showdata()
}







//deleteAll
function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}









//count







//update
function updatedata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    

  getTotal()
  count.style.display='none';
  category.value = datapro[i].category;
  submit.innerHTML='Update';
  mood = 'Update';
  tmp =i;
  scroll({
    top:0,
    behavior:'smooth',

  })


}








//search

let  searchMood = 'title';


function getcarchmood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchtitle'){
        searchMood = 'title';
       
    }
    else{
        searchMood = 'category';
       
    }
    search.placeholder = 'search By ' + searchMood;
    search.focus();
    search.value='';
    showdata()

}

function searchdata(value){
    let table = '';
   if(searchMood == 'title'){

    for(let i =0; i<datapro.length; i++){
        if(datapro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
                               <td>${i}</td>
                               <td>${datapro[i].title}</td>
                               <td>${datapro[i].price}</td>
                               <td>${datapro[i].taxes}</td>
                               <td>${datapro[i].ads}</td>
                               <td>${datapro[i].discount}</td>
                               <td>${datapro[i].totel}</td>
                               <td>${datapro[i].category}</td>
                               <td><button onclick ="updatedata(${i})" id="update">update</button></td>
                               <td><button onclick ='deletedata(${i})' id="delete">delete</button></td>
                           </tr>
           
           
           `;
        }
    }





   }else{
    for(let i =0; i<datapro.length; i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
                               <td>${i}</td>
                               <td>${datapro[i].title}</td>
                               <td>${datapro[i].price}</td>
                               <td>${datapro[i].taxes}</td>
                               <td>${datapro[i].ads}</td>
                               <td>${datapro[i].discount}</td>
                               <td>${datapro[i].totel}</td>
                               <td>${datapro[i].category}</td>
                               <td><button onclick ="updatedata(${i})" id="update">update</button></td>
                               <td><button onclick ='deletedata(${i})' id="delete">delete</button></td>
                           </tr>
           
           
           `;
        }
    }
   }

document.getElementById('tbody').innerHTML = table;
}


