// ENTIDADES

class User{
    constructor(nombre,pass){
        this.nombre=nombre;
        this.pass=pass
    }
}

class Producto {
    constructor(nombre,categoria,precio,stock){
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }
}

const gabriel = new User("gaby", "gaby");

let listaProductos;

if(localStorage.getItem("lista") == null) {
    listaProductos = []
}else{
    listaProductos = JSON.parse(localStorage.getItem("lista"))
}

const crearProducto = (nombre, categoria, precio, stock) => {
    const producto = new Producto(nombre, categoria, precio, stock)
    return producto
}

const confirmacionDeAcceso = () => {
    let bucle = true
    
    while(bucle){

        const nombre = prompt("Ingresa tu nombre");
        const pass = prompt("Ingresa tu pass");

        if(nombre === gabriel.nombre && pass === gabriel.pass) {
            bucle = false

            let ciclo = true;

            while(ciclo){

                const nombre = prompt("Ingrese nombre del producto");
                const categoria = prompt("Ingrese categoria del producto");
                const precio = Number(prompt("Ingrese precio del producto"));
                const stock = parseInt(prompt("Ingrese la cantidad de productos"));

                listaProductos.push(crearProducto(nombre,categoria,precio,stock))

                localStorage.setItem("lista", JSON.stringify(listaProductos))

                ciclo = confirm("Deseas agregar otro más")
            }

            break;

        }else{
            alert("Usuario incorrecto");
        }
    }
}

confirmacionDeAcceso()