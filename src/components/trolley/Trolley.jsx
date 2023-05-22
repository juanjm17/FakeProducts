import React, { useContext } from "react";
import ProductContext from "../../helpers/ProductContext";

const Trolley = () => {
  const { selectedProducts } = useContext(ProductContext);

  const uniqueProducts = Array.from(new Set(selectedProducts));

  const getTotalPrice = () => {
    const totalPrice = uniqueProducts.reduce((accumulator, product) => {
      const productPrice = Number(product.price);
      return accumulator + productPrice;
    }, 0);
    return totalPrice.toFixed(2);
  };

  return (
    <div>
      <h1>Productos</h1>
      {uniqueProducts.map((product) => (
        <div key={product.id}>
          <p> {product.title} </p>
          <p>{product.price}$</p>
        </div>
      ))}
      {uniqueProducts.length !== 0 ? (
        <p>Total: {Number(getTotalPrice())}$</p>
      ) : (
        "No hay nada"
      )}
    </div>
  );
};

export default Trolley;
