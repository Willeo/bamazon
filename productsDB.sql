DROP DATABASE IF EXISTS products_DB;
CREATE DATABASE products_DB;

USE products_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(65) NOT NULL,
  price FLOAT default 0,
  stock_quantity INT default 0
);



INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nvidia GeForce 1080 Ti", "Computer Accessories", 1050.50, 10), ("Nvidia GeForce 1070", "Computer Accessories", 750.50, 1000), ("AMD ATI FirePro W7100", "Computer Accessories", 699.99, 500), ("Samsung 860 EVO 1TB", "Computer Accessories", 199.99, 1500), ("Samsung 860 EVO 2TB", "Computer Accessories", 499.99, 250), ("Samsung 860 EVO 1TB", "Computer Accessories", 199.99, 1500), ("Samsung 860 EVO 250GB", "Computer Accessories", 85.99, 1500), ("WD Blue 3D NAND 250GB", "Computer Accessories", 78.99, 900), ("WD Blue 3D NAND 480GB", "Computer Accessories", 179.99, 900), ("Samsung QN65Q7F Flat 65” QLED 4K UHD 7 Series Smart TV 2018", "Electronics", 2078.99, 950), ("Adidas Cloudform", "Mens", 78.99, 1900);



