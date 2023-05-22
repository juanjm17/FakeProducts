import React, { useEffect, useState } from 'react';

const Product = ({data}) => {

    
  return (
    <div>
        <h3>{data.title}</h3>
        <img src={data.image} alt="" />
        <p>Precio:{data.price}</p>
    </div>
  )
}

export default Product