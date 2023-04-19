//List of 10 objects from a super market with the properties name, price, img and quantity
let products = [
    { name: "Apple",
        id: "1",
        price: 15,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/220px-Red_Apple.jpg",
        quantity: 0,
    },
    { name: "Banana",
        id: "2",
        price: 12,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/220px-Banana-Single.jpg",
        quantity: 0,
    },
    { name: "Orange",
        id: "3",
        price: 10,
        img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Orange%2C_orange_peel.jpg",
        quantity: 0,
    },
    { name: "Pineapple",
        id: "4",
        price: 25,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/220px-Pineapple_and_cross_section.jpg",
        quantity: 0,
    },
    { name: "Strawberry",
        id: "5",
        price: 10,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Yours_Food_Logo.jpg/640px-Yours_Food_Logo.jpg",
        quantity: 0,
    },
    { name: "Watermelon",
        id: "6",
        price: 12,
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Piece_of_watermelon.png/640px-Piece_of_watermelon.png",
        quantity: 0,
    },
    { name: "Mango",
        id: "7",
        price: 10,
        img: "https://upload.wikimedia.org/wikipedia/commons/e/ea/MANGOES.jpg",
        quantity: 0,    
    },
    { name: "Peach",
        id: "8",
        price: 7,
        img: "https://i0.wp.com/grospace.co.za/wp-content/uploads/2021/03/GroSpace-Peach.jpg?fit=1000%2C918&ssl=1",
        quantity: 0,
    },
    { name: "Pear",
        id: "9",
        price: 8,
        img: "https://dictionary.cambridge.org/es/images/thumb/pear_noun_002_26910.jpg?version=5.0.312",
        quantity: 0,
    },
    { name: "Grapes",
        id: "10",
        price: 10,
        img: "https://img.imageboss.me/fourwinds/width/425/dpr:2/s/files/1/2336/3219/products/blackmonukka.jpg?v=1538780984",
        quantity: 0,
    }
];

let fruitsDiv = document.getElementById("frutas")
renderProducts(products)

function renderProducts(arrayProductos) {
    arrayProductos.forEach(fruta => {
        let tarjeta = document.createElement("div")
        tarjeta.classList.add("tarjeta")
        tarjeta.innerHTML = `<h3>${fruta.name}</h3>
        <p>Price: DOP ${fruta.price}</p>
        <div class="image" style="background-image: url(${fruta.img})"></div>
        <button class="btn btn-primary" type="button" id="${fruta.id}">Add to cart</button>
        `
        fruitsDiv.appendChild(tarjeta)
        
        let btn = document.getElementById(fruta.id)
        btn.addEventListener("click", addToCart)
    })
}

let cart = []
//function to add the product to the cart
function addToCart(e) {
    let fruta = products.find(fruta => fruta.id === e.target.id)
    cart.push(fruta)
    console.log(cart)
}
//add event listener to the button
