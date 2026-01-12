const openShopping = document.querySelectorAll('.shopping');
const closeShopping = document.querySelector('.close-shopping');
const list =  document.querySelector('.list');
const listCard =  document.querySelector('.list-card');
const total =  document.querySelector('.total');
const body =  document.querySelector('body');
const quantity =  document.querySelector('.quantity');
const searchInput = document.querySelector('.searchInput');
const shopMobile = document.querySelector('.shopping');


openShopping.forEach(btn => {
    btn.addEventListener('click', () => {
        body.classList.add('active');
    });
});

if (closeShopping) {
    closeShopping.addEventListener('click', () => {
        body.classList.remove('active');
    });
}

let listCards = [];

let products = [
    {
        id: 1,
        name: "Filhote",
        category: "gato",
        Image: "cat1.jpeg",
        price: 20
    },
    {
        id: 2,
        name: "Adulto",
        category: "gato",
        Image: "cat2.jpeg",
        price: 25
    },
    {
        id: 3,
        name: "Idoso",
        category: "gato",
        Image: "cat3.jpeg",
        price: 25
    },
    {
        id: 4,
        name: "Mix de Pacotes",
        category: "gato",
        Image: "cat.jpeg",
        price: 30
    },
    {
        id: 5,
        name: "Filhote",
        category: "cao",
        Image: "dog1.jpeg",
        price: 20
    },
    {
        id: 6,
        name: "Adulto",
        category: "cao",
        Image: "dog2.jpeg",
        price: 25
    },
    {
        id: 7,
        name: "Idoso",
        category: "cao",
        Image: "dog3.jpeg",
        price: 25
    },
    {
        id: 8,
        name: "Mix de Pacotes",
        category: "cao",
        Image: "dog.jpeg",
        price: 30
    },
    {
        id: 9,
        name: "Surpresa",
        category: "cao",
        Image: "img5.jpeg",
        price: 24
    },
    {
        id: 10,
        name: "Cuidados com o Pet",
        category: "gato",
        Image: "img1.jpeg",
        price: 36
    },
    {
        id: 11,
        name: "Delícias Caninas",
        category: "cao",
        Image: "img2.jpeg",
        price: 40
    },
    {
        id: 12,
        name: "Felinos Felizes",
        category: "gato",
        Image: "img3.jpeg",
        price: 40
    }
];

const show = (filteredList) => {
    list.innerHTML = "";

    filteredList.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="/src/images/${value.Image}">
            <div class = "title">${value.name}</div>
            <div class = "price">${value.price.toLocaleString()}</div>
            <button  class = "btn-default" onclick = "addToCard(${key})">Adicionar ao Carrinho</button>
        `;

        list.appendChild(newDiv);
    });
};

show(products);

const apply = () => {
    const activeBtn = document.querySelector('.filter-btn.active');
    const pet = activeBtn.dataset.filter;
    const price = document.getElementById('price').value;
    const search = searchInput.value.toLocaleString().trim();

    let result = products.filter(product => {
        const matchSearch = product.name.toLowerCase().includes(search);
        const matchCategory = (pet === 'todos') || (product.category === pet);
        return matchSearch && matchCategory;
    });

    if(price === 'min') {
        result.sort((a, b) => a.price - b.price);
    } else if (price === 'max') {
        result.sort((a, b) => b.price - a.price);
    }

    show(result);
};

searchInput.addEventListener('input', apply);

const addToCard = (key) => {
    if(listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1
    }

    reloadCard();
};

const reloadCard = ()=> {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        if(value != null) {
            totalPrice = totalPrice + value.price;
            count = count + value.quantity;
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="/src/images/${value.Image}"></div>
                <div class = "cardTitle">${value.name}</div>
                <div class = "cardPrice">R$ ${value.price.toLocaleString()}</div>

                <div class = "quantity-controls">
                    <button class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = "R$ " + totalPrice.toLocaleString();
    quantity.innerText = count;

    const allSpan = document.querySelectorAll('.quantity');
        allSpan.forEach(span => {
            span.innerHTML = count;
        });

    localStorage.setItem('cart', JSON.stringify(listCards));
};


const changeQuantity = (key, quantity) => {
    if(quantity == 0 ) {
        delete listCards[key]
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }

    reloadCard();
};

const button = document.querySelectorAll('.filter-btn');

button.forEach(btn => {
    btn.addEventListener('click',(e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');

        apply();
    });
});

const selectPrice = document.getElementById('price');

const finishBtn = document.querySelector('.total');

finishBtn.addEventListener('click', () => {
    if(listCards.length > 0 && listCards.some(item => item !== null)) {
        alert("Compra finalizada! Obrigado por apoiar a Patinha Surpresa");

        listCards = [];
        reloadCard();
        body.classList.remove('active');
    } else {
        alert("Seu carrinho está vazio! Adicione algum mimo para o seu pet");
    }
});

selectPrice.addEventListener('change', () => {
    apply();
});

function localCart() {
    const saveCart = localStorage.getItem('cart');
    if(saveCart) {
        listCards = JSON.parse(saveCart);
        reloadCard();
    }
}

localCart();
show(products);
