// swiper

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

let list = document.querySelector(".list-icon");
let navbar = document.querySelector(".navbar");
let like = document.querySelectorAll(".bx-heart");
let bagCounter = document.querySelector(".bag-count");
let addToBag = document.querySelectorAll(".add-to-bag");
let phone = document.querySelector("#phone");
let people = document.querySelector("#quantity");
let booktable = document.querySelector(".book-btn");
let user = document.querySelector("#user");
let signin = document.querySelector(".signin-block");
let submitBtn = document.querySelector("#submit");
let email = document.querySelector("#floatingInput");
let pass = document.querySelector("#floatingPassword");
let products = document.querySelector(".product-box");
let shopping_cart = document.querySelector(".shopping-cart ul");
let emptyBag = document.querySelector(".emptyBag");
let clearBtn = document.querySelector('#clear-btn');
let buyBtn = document.querySelector('#buy-btn');


// list open close
list.onclick = () => {
  list.classList.toggle("move");
  navbar.classList.toggle("open-list");
}

// close on scroll
window.onscroll = () => {
  list.classList.remove("move");
  navbar.classList.remove("open-list");
  signin.classList.add("signin-block")
}

// scrollReveal
const animate = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: '2000',
  delay: '300',
});

animate.reveal(".nav");
animate.reveal(".home-text", { origin: 'left' });
animate.reveal(".home-img", { origin: 'right' });
animate.reveal(".home", { origin: 'top' });
animate.reveal(".ser-box, .product-box, .team-box, .book-data", { interval: 100 });

// login 
user.addEventListener("click", () => {
  signin.classList.toggle("signin-block");
  animate.reveal(".signin", { distance: '80px' });
});

const checkSignin = () => {
  if (email.value.trim() !== "" && pass.value.trim() !== "") {
    swal({
      title: "You are Signed in successfully",
      icon: "success",
      button: false,
      timer: 3000,
    });
    signin.classList.toggle("signin-block");
    email.value = "";
    pass.value = "";
  }
}

submitBtn.addEventListener("click", () => {
  checkSignin();
})

// closing login form
const closeSection = () => {
  signin.classList.toggle("signin-block");
}

// favourite
like.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle("bxs-heart");
  })
});

// shopping Bag
let bagCount = 0;
addToBag.forEach(item => {
  item.addEventListener('click', () => {
    bagCount++;
    bagCounter.style.display = "block";
    bagCounter.innerText = bagCount;
  });

  // shopping-cart
  let cart = {
    "Instant Coffee": 0,
    "Black coffee": 0,
    "Latte": 0,
    "Cappacino": 0,
    "Espresso": 0,
    "Milk Tea": 0
  };

  // update cart display
  function updateCart() {
    const cartList = document.querySelector("#cart-list");
    cartList.innerHTML = ""; // Clear the cart list

    let totalItem = 0;

    // Loop through cart and display items
    for (let product in cart) {
      if (cart[product] > 0) {
        const listItem = document.createElement("li");
        listItem.classList.add("cart-item");

        listItem.innerHTML = `
      <span class="product-quantity">${cart[product]}</span>
      <span class="product-name">${product}</span> 
      `;

        const incButton = document.createElement("button");
        const decButton = document.createElement("button");
        incButton.textContent = "+";
        decButton.textContent = "-";

        incButton.classList.add("inc-btn");
        decButton.classList.add("dec-btn");

        incButton.addEventListener("click", () => {
          cart[product] += 1;
          totalItem += 1;
          updateCart();
        });
        decButton.addEventListener("click", () => {
          if (cart[product] > 0) {
            cart[product] -= 1;
            totalItem -= 1;
            updateCart();
          }
        });

        listItem.appendChild(incButton);
        listItem.appendChild(decButton);
        cartList.appendChild(listItem);

        const clearAll = () => {
          if (cart[product] > 0) {
            cart[product] = 0;
            totalItem = 0;
            updateCart();
            emptyBag.classList.remove("hidden");
          }
        }

        clearBtn.addEventListener("click", () => {
          clearAll();
        });
        buyBtn.addEventListener("click", () => {
          if (cart[product] > 0) {
            swal({
              title: "Order Placed",
              text: "Get ready to sipp it up",
              icon: "success",
              button: "Okay!!",
            });
            clearAll();
            const cartContainer = document.querySelector("#cart-container");
            cartContainer.classList.add("hidden");
          }

        });
        totalItem += cart[product];

        if (totalItem > 0) {
          emptyBag.classList.add("hidden");
        }
      }
    }

    if (totalItem == 0) {
      emptyBag.classList.remove("hidden");
    }

    bagCounter.innerText = totalItem;
    bagCounter.style.display = totalItem > 0 ? "block" : "none";
  }

  // adding an item to the cart
  function addToCart(product) {
    cart[product] += 1;
    updateCart();
  }

  // adding items to the cart
  document.querySelectorAll('.product-box').forEach(box => {
    const addedToBag = document.createElement("div");
    addedToBag.classList.add("added-to-bag-msg", "hidden");
    addedToBag.innerText = "Added to Bag";
    box.append(addedToBag);
    box.querySelector(".add-to-bag").addEventListener('click', () => {
      const productName = box.querySelector('h2').textContent; // Get product name
      addToCart(productName);
      // show msg of item added
      addedToBag.classList.add('show');
      setTimeout(function () {
        addedToBag.classList.remove('show');
      }, 1000);
    });
  });
});

const toggleCart = () => {
  const cartContainer = document.querySelector("#cart-container");
  cartContainer.classList.toggle("hidden");
}

document.getElementById("cart-icon").addEventListener('click', () => {
  toggleCart();
});
document.getElementById("back-btn").addEventListener('click', () => {
  toggleCart();
});

// product vareity
function toggleTypes(id) {
  let box = document.getElementById(id);
  let content = box.parentElement.querySelector(".content");

  if (box.classList.contains("hidden")) {
    content.classList.add("blur");
    box.classList.remove("hidden");
    box.style.opacity = 1;
  } else {
    content.classList.remove("blur");
    box.classList.add("hidden");
    box.style.opacity = 0;
  }
}

// booking
phone.addEventListener("input", () => {
  if (phone.value.trim() !== "") {
    booktable.disabled = false;
  } else {
    booktable.disabled = true;
  }
})

booktable.onclick = () => {
  swal({
    title: "Table Booked",
    text: "We will contact you to confirm your booking",
    icon: "success",
    button: "Done",
  });
  phone.value = "";
  people.value = "";
}