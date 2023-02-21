document.addEventListener("DOMContentLoaded", () => {
  let shopping = JSON.parse(localStorage.getItem("shopping")) || [];

  //document variables
  let products = document.querySelector("#products");
  let storedItems = document.querySelector("#stored-items");
  let empty = document.querySelector("#empty");
  let fragment = document.createDocumentFragment();

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
    setLocal(shopping);
    printStoredList();
  };

  const removeFromList = ({ target }) => {
    let id = target.parentElement.id;
    const newList = shopping.filter((item) => item.id != id);
    setLocal(newList);
    shopping = getLocal();
    printStoredList();
  };

  setLocal = (updatedList) => {
    return localStorage.setItem("shopping", JSON.stringify(updatedList));
  };
  getLocal = () => {
    return JSON.parse(localStorage.getItem("shopping")) || [];
  };

  const deleteAll = () => {
    localStorage.clear();
    shopping = [];
    printStoredList([]);
  };

  const printStoredList = () => {
    storedItems.innerHTML = "";
    const productsToPrint = getLocal();
    productsToPrint.forEach((item) => {
      let listItem = document.createElement("li");
      listItem.textContent = item.name;
      fragment.append(listItem);
    });
    storedItems.append(fragment);
  };

  printStoredList();
}); //LOAD
