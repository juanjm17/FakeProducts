import React, { useContext, useState, useEffect } from "react";
import ProductContext from "../../helpers/ProductContext";
import getProducts from "../../helpers/getProducts";
import Product from "./Product";

import {Link} from "react-router-dom";

const Products = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => console.error(error));
  };

  const sendProduct = (product) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
  };

  const detectProduct = (id) => {
    return selectedProducts.find((product) => product.id === id);
  };

  const cancelElement = (id) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/products/${product.id}`} >
          <Product data={product} />
          </Link>
          {detectProduct(product.id) ? (
            <img
              src="https://w7.pngwing.com/pngs/355/539/png-transparent-green-check-illustration-check-mark-green-ticks-angle-leaf-plant-stem.png"
              alt="Check"
              onClick={() => cancelElement(product.id)}
            />
          ) : (
            <img
              src="https://w7.pngwing.com/pngs/263/881/png-transparent-plus-green-button-add-positive-icon-thumbnail.png"
              alt="Add"
              onClick={() => sendProduct(product)}
            />
          )}
       
        </div>
        
      ))}
    </div>
  );
};

export default Products;
