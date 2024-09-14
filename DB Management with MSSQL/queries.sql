-- Database Design

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
-- SQL Queries

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



