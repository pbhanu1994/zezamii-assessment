-- 1. Database Design

-- Tables for `Products`, `Orders`, `OrderItems`, `Customers`.
-- Products table
CREATE TABLE Products (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName NVARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL
);

-- Create Customers table
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    CustomerName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100),
    Phone NVARCHAR(15)
);

-- Orders table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- OrderItems table
CREATE TABLE OrderItems (
    OrderItemID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

----------------------------------------------------------
-- 2. SQL Queries

-- 1. Retrieve all orders and their associated customer details:
SELECT 
    Orders.OrderID, 
    Orders.OrderDate, 
    Customers.CustomerID, 
    Customers.CustomerName, 
    Customers.Email, 
    Customers.Phone
FROM 
    Orders
JOIN 
    Customers ON Orders.CustomerID = Customers.CustomerID;

-- 2. Retrieve a list of products not ordered in the last 30 days.
SELECT 
    Products.ProductID, 
    Products.ProductName, 
    Products.Price
FROM 
    Products
LEFT JOIN 
    OrderItems ON Products.ProductID = OrderItems.ProductID
LEFT JOIN 
    Orders ON OrderItems.OrderID = Orders.OrderID
GROUP BY 
    Products.ProductID, 
    Products.ProductName, 
    Products.Price
HAVING 
    MAX(Orders.OrderDate) IS NULL
    OR MAX(Orders.OrderDate) < DATEADD(DAY, -30, GETDATE()); 

-- 3. Update a product’s price and reflect that change in current orders:
-- updating the new price (99.99) of the product (productId 1)
UPDATE Products
SET Price = 99.99
WHERE ProductID = 1;
-- updating the UnitPrice in all orders where the product is included
UPDATE OrderItems
SET UnitPrice = 99.99
WHERE ProductID = 1;

-------------------------------------------------------------------
-- 3. Stored Procedures

--Create a stored procedure to return a customer's order history with product details:
CREATE PROCEDURE GetCustomerOrderHistory
    @CustomerID INT
AS
BEGIN
    SELECT 
        Orders.OrderID, 
        Orders.OrderDate, 
        Products.ProductName, 
        OrderItems.Quantity, 
        OrderItems.UnitPrice
    FROM 
        Orders
    JOIN 
        OrderItems ON Orders.OrderID = OrderItems.OrderID
    JOIN 
        Products ON OrderItems.ProductID = Products.ProductID
    WHERE 
        Orders.CustomerID = @CustomerID;
END;