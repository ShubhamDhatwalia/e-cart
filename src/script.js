var swiper = new Swiper(".mySwiper", {
    autoplay: {
        delay:3500,
        pauseOnMouseEnter: true,
    },
    loop: true,
});


var swiper = new Swiper(".mySwiper1", {
    slidesPerView: "auto",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
});












//  ----------------------- Accessing products CARD ------------------


const cards = document.querySelectorAll(".products-container .products .card");
const cartButtons = document.querySelectorAll(".products-container .products button");

const products = Array.from(cards);
const addToCart = Array.from(cartButtons);


addToCart.forEach((btn) =>{
    btn.addEventListener("click", ()=>{
        console.log("btn clicked");

        
    });
});



products.forEach((card) => {
    
    card.addEventListener("click", ()=>{
    const currCardId = card.id;

    console.log(currCardId);

    const name = card.childNodes[3].childNodes[3].innerText;
    console.log(name);

    const price = card.childNodes[3].childNodes[5].childNodes[1].childNodes[2].innerText
    console.log(price);

    const srcImg = card.childNodes[1].src
    console.log(srcImg);

    cartUpdate(name, price, srcImg);

    });
});



//   ---------------------------- Accessing CART ------------------------------


function cartUpdate(name, price, srcImg){

    const cart = document.querySelectorAll(".offcanvas-cart .table");
    console.log(cart);
    console.log(typeof cart);
    
    const cartTable = Array.from(cart);
    console.log(cartTable[0].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[1].setAttribute("src",srcImg));

    console.log(cartTable[0].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[1].getAttribute("src"));

    console.log(cartTable[0].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[3].innerText=name);

    console.log(cartTable[0].childNodes[3].childNodes[1].childNodes[5].childNodes[1].childNodes[3].innerText=price);

};

