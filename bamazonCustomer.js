const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password",
    database: "product_DB"
  });
  




connection.connect(function(err) {
    if (err) throw err;

    console.log("We are connected...")
    start();
  });

  
  
function start() {
     // Running this application will first display all of the items available for sale.
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
      });

// . The app should then prompt users with two messages.
    inquirer
      .prompt({
        name: "item",
        type: "input",
        message: "Please list the item's ID you would like to purchase: "
      },
      {
          //    * The second message should ask how many units of the product they would like to buy.

        type: "input",
        name: "quantity",
        message: "How many would you like?"
      })
      .then(function(answer) {
        // based on answer, check quantity of item 
        if (quantity === 0){
            console.log("Insufficient quantity");
            start();
        }
        else {
         
        }
      });
  }



// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.

//    * This means updating the SQL database to reflect the remaining quantity.

//    * Once the update goes through, show the customer the total cost of their purchase.
