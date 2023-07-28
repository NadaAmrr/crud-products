var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var btn = document.getElementById('btnSubmit');
var updateIndex;
var productContainer;


if(localStorage.getItem('myProducts') != null){
    productContainer = JSON.parse(localStorage.getItem('myProducts'))
    displayProducts(productContainer)
}else{
    productContainer = []
}
// Add one product
function addProduct(){
    if (btn.innerHTML =='Update') {
        btn.innerHTML = 'Submit'
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDesc.value,
    }
    productContainer.splice(updateIndex , 1 , product);
    } else if(btn.innerHTML =='Submit'){
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDesc.value,
          };
          productContainer.push(product);
    }
    localStorage.setItem('myProducts', JSON.stringify(productContainer))    
    displayProducts(productContainer)
    clearForm()
}
//clear form
function clearForm(){
    productName.value = ""
    productPrice.value = ""
    productCategory.value = ""
    productDesc.value = ""
}
// Display Products
function displayProducts(data){
    var listTable = ``
    for (let i = 0; i < data.length; i++) {
        listTable += ` <tr>
        <td >${data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].category}</td>
        <td>${data[i].desc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning btn-sm btn-update"><i class="fa-solid fa-pen-to-square"></i></button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm text-white btn-delete"><i class="fa-solid fa-trash-can"></i></button></td>
      </tr>`;
        
    }
    document.getElementById('displayProducts').innerHTML = listTable
}
//Update one product
function updateProduct(index){
    btn.innerHTML='Update'
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDesc.value = productContainer[index].desc
    updateIndex = index;
    
}
//Delete one product
function deleteProduct(index){
    productContainer.splice(index, 1);
    localStorage.setItem('myProducts' , JSON.stringify(productContainer));
    displayProducts(productContainer)
}



function search(term){
    console.log(term);

    var selected = [];

    for (let i = 0; i < productContainer.length; i++) {
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
            selected.push(productContainer[i])
        }
        displayProducts(selected)        
    }
}