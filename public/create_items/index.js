// functionality to add an item to the database
let submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", async () => {
  let nameString = document.getElementById("name-input").value;
  let priceNumber = +document.getElementById("price-input").value;
  let inventoryNumber = +document.getElementById("inventory-input").value;
  let nextDeliveryString = document.getElementById("next-delivery-input").value;
  let deliveryAmtNumber = +document.getElementById("delivery-amt-input").value;

  const item = {
    nameString,
    priceNumber,
    inventoryNumber,
    nextDeliveryString,
    deliveryAmtNumber,
  };

  let response = await fetch("http://localhost:5000/make_item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  let uploadStatusTag = document.getElementById("upload-status");
  console.log(response.status);
  if (response.status === 200) {
    uploadStatusTag.classList.remove("hidden");
    uploadStatusTag.textContent = "Upload Completed";
    uploadStatusTag.style.color = "green";
  } else {
    console.log(response);
    uploadStatusTag.classList.remove("hidden");
    uploadStatusTag.textContent = "Upload Failed";
    uploadStatusTag.style.color = "red";
  }
});

// functionality to return to the home page
let homeBtn = document.getElementById("go-home-btn");

homeBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

// functionality to display all items currently in the database
let showAllItemsBtn = document.getElementById("show-all-items-btn");

showAllItemsBtn.addEventListener("click", () => {
  window.location.href = "../display_items";
});
