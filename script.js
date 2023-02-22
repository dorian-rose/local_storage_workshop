document.addEventListener("DOMContentLoaded", () => {
  //document variables
  let products = document.querySelector("#products");
  let storedItems = document.querySelector("#stored-items");
  let empty = document.querySelector("#empty");
  let fragment = document.createDocumentFragment();

  //original list of fruit
  const originalArray = [
    { id: "apple", product: "apple" },
    { id: "mango", product: "mango" },
    { id: "strawberry", product: "strawberry" },
    { id: "peach", product: "peach" },
    { id: "pear", product: "pear" },
    { id: "orange", product: "orange" },
    { id: "mandarin", product: "mandarin" },
  ];

  let shoppingSelected = JSON.parse(localStorage.getItem("shopping")) || [];
  //event listeners
  document.addEventListener("click", ({ target }) => {
    if (target.matches(".add")) {
      const id = target.parentElement.id;
      addToSelectedList(id);
      printStoredList();
    }

    if (target.matches(".remove")) {
      const id = target.parentElement.id;
      removeFromList(id);
      printStoredList();
    }
  });

  empty.addEventListener("click", () => {
    deleteAll();
  });

  //functions
  //print first list
  const printOriginalList = () => {
    originalArray.forEach(({ id, product }) => {
      const listElement = document.createElement("LI");
      listElement.id = id;
      listElement.innerHTML = `${product}
                                        <button class="add">add</button>`;

      fragment.append(listElement);
    });
    products.append(fragment);
  };

  //add product to list of selected products
  const addToSelectedList = (id) => {
    const productFound = originalArray.find((item) => {
      return item.id == id;
    });
    const productAlready = shoppingSelected.find((item) => {
      return item.id == id;
    });
    if (!productAlready) {
      shoppingSelected.push(productFound);
      setLocal();
    }
    console.log(productFound);
    // shoppingSelected.push(productFound);
    // setLocal();
  };

  //remove item from list
  const removeFromList = (id) => {
    const elementIndex = shoppingSelected.findIndex((item) => item.id == id);
    if (elementIndex != -1) {
      shoppingSelected.splice(elementIndex, 1);
      setLocal();
    }
  };

  setLocal = () => {
    return localStorage.setItem("shopping", JSON.stringify(shoppingSelected));
  };
  getLocal = () => {
    return JSON.parse(localStorage.getItem("shopping")) || [];
  };

  const deleteAll = () => {
    localStorage.clear();
    shoppingSelected = [];
    printStoredList([]);
  };

  const printStoredList = () => {
    storedItems.innerHTML = "";
    const productsToPrint = getLocal();
    productsToPrint.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.id = item.id;
      listItem.innerHTML = `${item.product}<button class="remove">remove</button>`;
      fragment.append(listItem);
    });
    storedItems.append(fragment);
  };

  printOriginalList();
  printStoredList();
}); //LOAD
