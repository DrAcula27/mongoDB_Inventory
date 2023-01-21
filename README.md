# Homework Assignment - Inventory Management

## Per Scholas - Week 8 - Front-end, Express, and MongoDB - Assignment: MongoDB_Inventory

### MVP

- Create an express server that will serve a public folder.
- Create a new database “Inventory”
- Connect to that database with you Express Server
- Create a Mongoose Schema / Model that could create the following object in a collection called “items”:
    ```
    {
        price: 2.00,
        inventory: 700,
        nextDelivery: Date,
        deliveryAmt: 200,
        name: "Toy Car"
    }
    ```
- On your frontend:
    + Make a page that will create new items in your “items” collection.
    + Make a page that will display all items in your collection.
    + (optional) - make a page that will increase / decrease the inventory of a specific item by a specified number.

INSTEAD OF A FRONTEND
- You may use thunderclient to test your routes, schema, server, and database. The important thing is that your server and MongoDB work well together. 
- You still need to setup and serve a public folder, though. 