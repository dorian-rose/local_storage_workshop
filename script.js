let shopping = [];
//const storedShopping = JSON.parse(localStorage.getItem("shopping")) || [];

//document variables
let products = document.querySelector("#products");
let storedItems = document.querySelector("#stored-items");
let empty = document.querySelector("#empty");

//event listeners
products.addEventListener("click", ({ target }) => {
  chooseFunction({ target });
});
empty.addEventListener("click", () => {
  deleteAll();
});

//functions
const chooseFunction = ({ target }) => {
  if (target.matches(".add")) {
    addToList({ target });
  } else {
    if (target.matches(".remove")) {
      removeFromList({ target });
    }
  }
};
const addToList = ({ target }) => {
  let product = {};
  product.id = target.parentElement.id;
  product.name = target.parentElement.children[0].textContent;
  shopping.push(product);
  localStorage.setItem("shopping", JSON.stringify(shopping));
  const storedShopping = JSON.parse(localStorage.getItem("shopping")) || [];
  printStoredList(storedShopping);
};

//funcion "remove" quita todos las frutas de un ID seleccionado. Con mas tiempo, buscaría hacer que si hay mas de una fruta del mismo tipo, solo quite una
const removeFromList = ({ target }) => {
  //no funcionó con "storedShopping" declarado desde fuera
  const storedShopping = JSON.parse(localStorage.getItem("shopping")) || [];
  let id = target.parentElement.id;
  const newList = storedShopping.filter((item) => item.id != id);
  localStorage.setItem("shopping", JSON.stringify(newList));
  shopping = newList;
  printStoredList(newList);
};

const deleteAll = () => {
  localStorage.clear();
  shopping = [];
  printStoredList([]);
};

const printStoredList = (productsToPrint) => {
  storedItems.innerHTML = "";
  productsToPrint.forEach((item) => {
    let listItem = document.createElement("li");
    listItem.textContent = item.name;
    storedItems.append(listItem);
  });
};
