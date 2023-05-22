import React, { useState } from 'react';
import Products from '../products/Products';
import Trolley from '../trolley/Trolley';
import ProductContext from '../../helpers/ProductContext';
import './main.css'; // Archivo CSS para los estilos


const MainPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <div className="main-page-container">
      <ProductContext.Provider value={{ selectedProducts, setSelectedProducts }}>
        <div className="products-column">
          <Products />
        </div>
        <div className="trolley-column">
          <Trolley />
        </div>
      </ProductContext.Provider>
    </div>
  );
};

export default MainPage;