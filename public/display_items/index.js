// functionality to display all the items currently in the database
let containerElement = document.getElementById("container");

const getData = async () => {
  let data = await fetch("http://localhost:5000/show_all_items");
  data.json().then((parsedData) => {
    console.log(parsedData); // array of objects
    parsedData.forEach((object) => {
      let pTag = document.createElement("p");
      pTag.textContent = object.name;
      containerElement.appendChild(pTag);
    });
  });
};
getData();

// functionality to return to the home page
let homeBtn = document.getElementById("go-home-btn");

homeBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

// functionality to move to the create an item page
let createItemBtn = document.getElementById("create-item-btn");

createItemBtn.addEventListener("click", () => {
  window.location.href = "../create_items";
});

// functionality to delete items that have no name
let deleteButton = document.getElementById("delete");

deleteButton.addEventListener("click", async () => {
  let response = await fetch("http://localhost:5000/delete_nameless_items", {
    method: "delete",
  });

  let parsedData = await response.json();
  console.log(parsedData);
  window.location.reload();
});
