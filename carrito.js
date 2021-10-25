let listaObjetos;
let imprimirDatos = document.getElementById("productosPrint")
let btn= document.getElementById("finalizarCompra")

if(localStorage.getItem("carrito") == null) {
    alert("Carrito vacio")
}else{
    listaObjetos = JSON.parse(localStorage.getItem("carrito"))
}
listaObjetos.forEach(element => {
    imprimirDatos.innerHTML +=`
    <div class="card col-4" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${element.nombre}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${element.categoria}</h6>
        <p class="card-text">${element.precio}</p>
        <button  class="card-link">Comprar</button>
    </div>
    </div>
    `    
});

const finzalizarCompra = () => {
    let monto = 0

    listaObjetos.forEach(e => {

        monto +=e.precio

    })

    console.log("Felicitaciones, tu compra fue aprobada, gastate " + monto);
    localStorage.removeItem("carrito")
}

btn.addEventListener("click", () => {
    finzalizarCompra()
})