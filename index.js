/*

This is how an item object should look like

{
      id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
      name: "beetroot",
      price: 0.35 <- You can come up with your own prices
    }

*/

// Deliverables
// - A user can view a selection of items in the store
// - From the store, a user can add an item to their cart
// - From the cart, a user can view and adjust the number of items in their cart
//     - If an item's quantity equals zero it is removed from the cart
// - A user can view the current total in their cart

const state = {
  groceries: [
    {
      id: "001-beetroot",
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
      name: "cherry",
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
const storeListEl = document.querySelector(".store--item-list");
const cartListEl = document.querySelector(".cart--item-list");

function renderGroceries() {
  for (const item of state.groceries) {
    const listitemEl = createGroceriItem(item);
    storeListEl.append(listitemEl);
  }
}

function createGroceriItem(item) {
  const listitemEl = document.createElement("li");
  const storeItemIconEl = document.createElement("div");
  storeItemIconEl.setAttribute("class", "store--item-icon");

  const imgEl = document.createElement("img");
  imgEl.setAttribute("alt", item.name);
  imgEl.src = item.icon;

  const buttonEl = document.createElement("button");
  buttonEl.innerText = "Add to cart";

  buttonEl.addEventListener("click", function () {
    addItemToCart(item);
    renderCartItems();
  });

  storeItemIconEl.append(imgEl);
  listitemEl.append(storeItemIconEl, buttonEl);

  return listitemEl;
}

function addItemToCart(clickedItem) {
  let itemIsInCart = false;
  for (const item of state.cart) {
    if (item.id === clickedItem.id) {
      itemIsInCart = true;
      item.amount += 1;
    }
  }

  if (!itemIsInCart) {
    const cartItem = {
      id: clickedItem.id,
      icon: clickedItem.icon,
      name: clickedItem.name,
      amount: 1,
    };
    state.cart.push(cartItem);
  }
}

function cartItem(item) {
  //li
  const cartItemEl = document.createElement("li");
  //img
  const cartImg = document.createElement("img");
  cartImg.setAttribute("class", "cart--item-icon");
  cartImg.setAttribute("alt", item.name);
  cartImg.src = item.icon;

  //p
  const titleEl = document.createElement("p");
  titleEl.innerText = item.name;

  //quantity btn
  const quantityBtnRemove = document.createElement("button");
  quantityBtnRemove.setAttribute("class", "quantity-btn");
  quantityBtnRemove.classList.add("remove-btn");
  quantityBtnRemove.classList.add("center");
  quantityBtnRemove.innerText = "-";

  //span
  const spanEl = document.createElement("span");
  spanEl.setAttribute("class", "quantity-text");
  spanEl.classList.add("center");
  spanEl.innerText = item.amount;

  //quantity btn right
  const quantityBtnRight = document.createElement("button");
  quantityBtnRight.setAttribute("class", "quantity-btn");
  quantityBtnRight.classList.add("add-btn");
  quantityBtnRight.classList.add("center");
  quantityBtnRight.innerText = "+";

  quantityBtnRight.addEventListener("click", function () {
    spanEl.innerText = item.amount += 1;
    renderCartItems();
  });

  quantityBtnRemove.addEventListener("click", function () {
    if (item.amount === 1) {
      cartItemEl.remove();
      let indexOfItem = state.cart.findIndex(function (element) {
        return element.id === item.id;
      });
      state.cart.splice(indexOfItem, 1);
      renderCartItems();
    } else {
      spanEl.innerText = item.amount -= 1;
    }
  });

  cartItemEl.append(
    cartImg,
    titleEl,
    quantityBtnRemove,
    spanEl,
    quantityBtnRight
  );

  return cartItemEl;
}

function calculateTotal() {
  const totalEl = document.querySelector(".total-number");
  let total = 0;
  for (const itemFromCArt of state.cart) {
    const foundItem = state.groceries.find(function (itemFromStore) {
      return itemFromCArt.id === itemFromStore.id;
    });
    total += foundItem.price * itemFromCArt.amount;
    console.log(total);
  }

  totalEl.innerText = `£${total.toFixed(2)}`;
}

function renderCartItems() {
  cartListEl.innerHTML = "";
  for (const item of state.cart) {
    const cartItemEl = cartItem(item);
    cartListEl.append(cartItemEl);
  }
  calculateTotal();
}

renderGroceries(state);
renderCartItems(state);
