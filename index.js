/*

This is how an item object should look like

{
      id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
      name: "beetroot",
      price: 0.35 <- You can come up with your own prices
    }

*/

const state = {
  groceries: [
    {
      id: 001,
      name: "beetroot",
      icon: String.raw`assets\icons\001-beetroot.svg`,
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      icon: String.raw`assets\icons\002-carrot.svg`,
      price: 0.45,
    },
    {
      id: "003-apple",
      name: "apple",
      icon: String.raw`assets\icons\003-apple.svg`,
      price: 0.55,
    },
    {
      id: "004-apricot",
      name: "apricot",
      icon: String.raw`assets\icons\004-apricot.svg`,
      price: 0.75,
    },
    {
      id: "005-avocado",
      name: "avocado",
      icon: String.raw`assets\icons\005-avocado.svg`,
      price: 0.83,
    },
    {
      id: "006-bananas",
      name: "bananas",
      icon: String.raw`assets\icons\006-bananas.svg`,
      price: 1.7,
    },
    {
      id: "007-bell-pepper",
      name: "bell-pepper",
      icon: String.raw`assets\icons\007-bell-pepper.svg`,
      price: 0.9,
    },
    {
      id: "008-berry",
      name: "berry",
      icon: String.raw`assets\icons\008-berry.svg`,
      price: 1.9,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      icon: String.raw`assets\icons\009-blueberry.svg`,
      price: 2.75,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      icon: String.raw`assets\icons\010-eggplant.svg`,
      price: 0.83,
    },
  ],
  cart: [],
};
const storeUlEl = document.querySelector(".store--item-list");
/* <ul class="cart--item-list"></ul>; */
const cartUlEl = document.querySelector(".cart--item-list");

function renderGroceries(state) {
  for (const grocery of state.groceries) {
    const listitemEl = createGroceriItem(grocery);
    storeUlEl.append(listitemEl);
  }
}

function createGroceriItem(grocery) {
  const listitemEl = document.createElement("li");
  const storeItemIconEl = document.createElement("div");
  storeItemIconEl.setAttribute("class", "store--item-icon");

  const imgEl = document.createElement("img");
  imgEl.setAttribute("alt", grocery.name);
  imgEl.src = grocery.icon;

  const buttonEl = document.createElement("button");
  buttonEl.innerText = "Add to cart";

  buttonEl.addEventListener("click", function () {
    state.cart.push(listitemEl);
  });

  storeItemIconEl.append(imgEl);
  listitemEl.append(storeItemIconEl, buttonEl);

  return listitemEl;
}

function renderCartGroceries(state) {
  for (const grocery of state.cart) {
    const cartItemEl = cartItem(grocery);
    cartUlEl.append(cartItemEl);
  }
}

function cartItem(grocery) {
  // <li>
  //   <img
  //     class="cart--item-icon"
  //     src="assets/icons/001-beetroot.svg"
  //     alt="beetroot"
  //   />
  //   <p>beetroot</p>
  //   <button class="quantity-btn remove-btn center">-</button>
  //   <span class="quantity-text center">1</span>
  //   <button class="quantity-btn add-btn center">+</button>
  // </li>;

  //li
  const cartItemEl = document.createElement("li");
  //img
  const cartImg = document.createElement("img");
  cartImg.setAttribute("class", "cart--item-icon");
  cartImg.setAttribute("alt", grocery.name);
  cartImg.src = grocery.icon;

  //p
  const titleEl = document.createElement("p");
  titleEl.innerText = grocery.name;

  //quantity btn
  const quantityBtn = document.createElement("button");
  quantityBtn.setAttribute("class", "quantity-btn");
  quantityBtn.classList.add("remove-btn");
  quantityBtn.classList.add("center");

  //span
  const spanEl = document.createElement("span");
  spanEl.setAttribute("class", "quantity-text");
  spanEl.classList.add("center");
  spanEl.innerText = "1";

  //quantity btn right
  const quantityBtnRight = document.createElement("button");
  quantityBtnRight.setAttribute("class", "quantity-btn");
  quantityBtnRight.classList.add("add-btn");
  quantityBtnRight.classList.add("center");

  cartItemEl.append(cartImg, titleEl, quantityBtn, spanEl, quantityBtnRight);

  return cartItemEl;
}

renderGroceries(state);
