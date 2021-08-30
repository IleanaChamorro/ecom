var updateBtns = document.getElementsByClassName('update-cart')


for(var i = 0; i < updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('Producto Id: ', productId, 'Accion: ', action)

        console.log('USUARIO:', user)
        if(user == 'AnonymousUser'){
           addCookieItem(productId, action)
        }else{
            updateUserOrder(productId, action)
        }
    })
}

//Agregar items sin el usuario estar loggeado
function addCookieItem(productId, action){
    console.log('Usuario no Loggeado')

    if(action == 'add'){
        if(cart[productId] == undefined){
            cart[productId] = {'quantity':1}
        }else{
            cart[productId]['quantity'] += 1
        }
    }
    if(action == 'remove'){
        cart[productId]['quantity'] -= 1

        if(cart[productId]['quantity'] <= 0){
            console.log('Remover Item')
            delete cart[productId]
        }
    }
    console.log('CARRITO:', cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain;path=/"
    location.reload()
}

function updateUserOrder(productId, action){
    console.log('Usuario Loggeado, enviando data...')

    var url = '/update_item/'

    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'productId': productId, 'action': action})
    })
    .then((response) =>{
        return response.json()
    })

    .then((data) =>{
        console.log('data:', data)
        location.reload()
    })
}