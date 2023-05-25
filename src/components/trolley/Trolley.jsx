import React, { useContext } from "react";
import ProductContext from "../../helpers/ProductContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // Importa el módulo de Firestore

const stripePromise = loadStripe(
  "pk_test_51MZHK4EfN6qga162jY0Gkg9nVldwzFSB50g9XOwel24CQAs8p4qLjNAxuZ5H3bCd3vDPsMSbiNUdkDEbQ0LUMUQM00JMd9ET4s"
);

const firebaseConfig = {
  apiKey: "AIzaSyB8SZC-W5tIzk3QDW0365zSRV-BZwl7gV8",
  authDomain: "orders-aac27.firebaseapp.com",
  projectId: "orders-aac27",
  storageBucket: "orders-aac27.appspot.com",
  messagingSenderId: "892619633482",
  appId: "orders-aac27",
};

firebase.initializeApp(firebaseConfig);

const Trolley = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductContext);

  const uniqueProducts = Array.from(new Set(selectedProducts));

  const getTotalPrice = () => {
    const totalPrice = uniqueProducts.reduce((accumulator, product) => {
      const productPrice = Number(product.price);
      return accumulator + productPrice;
    }, 0);
    return totalPrice.toFixed(2);
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (selectedProducts.length !== 0) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

        if (!error) {
          console.log("Pago exitoso:", paymentMethod);

          const orderData = {
            products: uniqueProducts.map((product) => product.title),
            totalPrice: getTotalPrice(),
          };

         
          await firebase.firestore().collection("orders").add(orderData);

          setSelectedProducts([]);
        } else {
          console.error("Error al procesar el pago:", error);
        }
      } else {
        console.log("Debe haber productos");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit">Pagar</button>
      </form>
    );
  };

  return (
    <div>
      <h1>Productos</h1>
      {uniqueProducts.map((product) => (
        <div key={product.id}>
          <p>{product.title}</p>
          <p>{product.price}$</p>
        </div>
      ))}
      {uniqueProducts.length !== 0 ? (
        <p>Total: {Number(getTotalPrice())}$</p>
      ) : (
        "No hay nada"
      )}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Trolley;
