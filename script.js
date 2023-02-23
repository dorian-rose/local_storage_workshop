document.addEventListener("DOMContentLoaded", () => {
  //document variables
  let products = document.querySelector("#products");
  let storedItems = document.querySelector("#stored-items");
  let empty = document.querySelector("#empty");
  let fragment = document.createDocumentFragment();

  //original list of fruit
  const originalArray = [
    { id: "apple", product: "apple", count: 1 },
    { id: "mango", product: "mango", count: 1 },
    { id: "strawberry", product: "strawberry", count: 1 },
    { id: "peach", product: "peach", count: 1 },
    { id: "pear", product: "pear", count: 1 },
    { id: "orange", product: "orange", count: 1 },
    { id: "mandarin", product: "mandarin", count: 1 },
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
    const productFound = originalArray.find((item) => item.id == id);
    const productAlready = shoppingSelected.find((item) => item.id == id);
    if (!productAlready) {
      shoppingSelected.push(productFound);
      setLocal();
    } else {
      productFound.count++;
      setLocal();
    }
    // shoppingSelected.push(productFound);
    // setLocal();
  };

  //remove item from list
  const removeFromList = (id) => {
    const productFound = shoppingSelected.find((item) => item.id == id);
    if (productFound.count > 1) {
      productFound.count--;
      setLocal();
    } else {
      const elementIndex = shoppingSelected.findIndex((item) => item.id == id);
      if (elementIndex != -1) {
        shoppingSelected.splice(elementIndex, 1);
        setLocal();
      }
    }
  };

  setLocal = () => {
    return localStorage.setItem("shopping", JSON.stringify(shoppingSelected));
  };
  getLocal = () => {
    return JSON.parse(localStorage.getItem("shopping")) || [];
  };

  const deleteAll = () => {
    shoppingSelected.forEach((item) => {
      item.count = 1;
    });

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
      listItem.innerHTML = `${item.count}x ${item.product}<button class="remove">remove</button>`;
      fragment.append(listItem);
    });
    storedItems.append(fragment);
  };

  printOriginalList();
  printStoredList();
}); //LOAD
