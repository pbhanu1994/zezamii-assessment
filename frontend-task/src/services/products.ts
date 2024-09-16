import axios from "axios";

const getProducts = async () => {
  try {
    const {
      data: { products },
    } = await axios.get("https://dummyjson.com/products");

    return products;
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export default getProducts;
