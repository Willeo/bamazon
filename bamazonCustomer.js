const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

// ************************* Connection to DB  ***************
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Password",
  database: "products_DB"
});

connection.connect(function(err) {
  if (err) throw err;

  console.log("We are connected...");
  startPrompt();
});

// ********************************************************

function startPrompt() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Care view our inventory?",
        default: true
      }
    ])
    .then(function(user) {
      if (user.confirm === true) {
        inventory();
      } else {
        console.log("Thank you!");
      }
    });
}

//=================================Inventory===============================
// using the cli-table to display the table

function inventory() {
  var table = new Table({
    head: ["id", "product_name", "department_name", "price", "stock_quantity"],
    colWidths: [10, 50, 30, 20, 20]
  });


  // Show inventory 
  function listInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
      
      for (let i = 0; i < res.length; i++) {
        let itemId = res[i].id,
          product_name = res[i].product_name,
          department_name = res[i].department_name,
          price = res[i].price,
          stock_quantity = res[i].stock_quantity;

        table.push([
          itemId,
          product_name,
          department_name,
          price,
          stock_quantity
        ]);
      }
      console.log("");
      console.log(
        "====================================================== Current Inventory ======================================================"
      );
      console.log("");
      console.log(table.toString());
      console.log("");
      continuePrompt();
    });
  }

  listInventory();
}

//=================================Inquirer user purchase===============================

function continuePrompt() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "continue",
        message: "Would you like to purchase an item?",
        default: true
      }
    ])
    .then(function(user) {
      if (user.continue === true) {
        selectionPrompt();
      } else {
        console.log("Thank you! Come back soon!");
      }
    });
}

//=================================Item selection and Quantity desired===============================

function selectionPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "inputId",
        message:
          "Please enter the ID number of the item you would like to purchase."
      },
      {
        type: "input",
        name: "inputNumber",
        message: "How many units of this item would you like to purchase?"
      }
    ])
    .then(function(userPurchase) {
      //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.

      connection.query(
        "SELECT * FROM products WHERE id=?",
        userPurchase.inputId,
        function(err, res) {
          for (var i = 0; i < res.length; i++) {
            if (userPurchase.inputNumber > res[i].stock_quantity) {
              console.log(
                "==================================================="
              );
              console.log(
                "Sorry! Not enough in stock. Please try again later."
              );
              console.log(
                "==================================================="
              );
              startPrompt();
            } else {
              //list item information for user for confirm prompt
              console.log("");
              console.log("Awesome! We can fulfull your order.");
              console.log("");
              console.log("You've selected:");
              console.log("----------------");
              console.log("Item: " + res[i].product_name);
              console.log("Department: " + res[i].department_name);
              console.log("Price: " + res[i].price);
              console.log("Quantity: " + userPurchase.inputNumber);
              console.log("");
              console.log("Total: " + res[i].price * userPurchase.inputNumber);
              console.log("");

              var newStock = res[i].stock_quantity - userPurchase.inputNumber;
              var purchaseId = userPurchase.inputId;
              //console.log(newStock);
              confirmPrompt(newStock, purchaseId);
            }
          }
        }
      );
    });
}

//=================================Confirm Purchase===============================

function confirmPrompt(newStock, purchaseId) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirmPurchase",
        message:
          "Are you sure you would like to purchase this item and quantity?",
        default: true
      }
    ])
    .then(function(userConfirm) {
      
      if (userConfirm.confirmPurchase === true) {
        //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.

        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newStock
            },
            {
              id: purchaseId
            }
          ],
          function(err, res) {}
        );

        console.log("=================================");
        console.log("Transaction completed. Thank you.");
        console.log("=================================");
        startPrompt();
      } else {
        console.log("=================================");
        console.log("No worries. Maybe next time!");
        console.log("=================================");
        startPrompt();
      }
    });
}
