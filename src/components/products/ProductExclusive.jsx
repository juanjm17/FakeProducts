import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import getProductById from "../../helpers/getProductById";
import { Link } from "react-router-dom";
const ProductExclusive = () => {
  let id = useParams().idProduct;

  const [product, setProduct] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getProductById(id)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt="" />
      <p>{product.description}</p>
      <Link to="/">Volver</Link>
    </div>
  );
};

export default ProductExclusive;
