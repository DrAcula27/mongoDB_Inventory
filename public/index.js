// functionality to move to the create an item page
let createItemBtn = document.getElementById("create-item-btn");

createItemBtn.addEventListener("click", () => {
  window.location.href = "./create_item";
});

// functionality to move to the display all items page
let showItemsBtn = document.getElementById("show-items-btn");

showItemsBtn.addEventListener("click", () => {
  window.location.href = "./display_items";
});

// functionality to search for an item
let searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  let showItemArea = document.getElementById("show-item-area");
  let userQuery = document.getElementById("user-query").value;
  if (userQuery === "") {
    showItemArea.classList.remove("hidden");
    showItemArea.style.color = "red";
    showItemArea.innerHTML =
      "<h2>Please type the name of an item in the search bar before clicking the search button!</h2>";
  } else {
    let res = await fetch(`http://localhost:5000/search/${userQuery}`);
    let item = await res.json();
    console.log(item);
    try {
      showItemArea.classList.remove("hidden");
      showItemArea.innerHTML = `
        <p>Name: ${item[0].name}</p>
        <p>Price: ${item[0].price}</p>
        <p>Inventory: ${item[0].inventory}</p>
        <p>Next Delivery Date: ${item[0].deliveryDate}</p>
        <p>Next Delivery Amount: ${item[0].deliveryAmt}</p>
        `;
    } catch (error) {
      showItemArea.style.color = "red";
      showItemArea.innerHTML =
        "<h2>That item is not in the database. Please search for another item.</h2>";
    }
  }
});
