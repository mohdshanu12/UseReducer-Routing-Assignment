import React, { useReducer } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import BrowserRouter, Routes, Route, and Link
import './App.css';

const initialState = {
  cart: [],
  products: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const HomePage = ({ addToCart, products }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>Welcome to our e-commerce website!</p>
    </div>
  );
};

const CartPage = ({ cart }) => {
  return (
    <div>
      <h1>Cart Page</h1>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}

          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://course-api.com/react-store-products');
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/cart">Cart ({state.cart.length})</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} products={state.products} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage cart={state.cart} />} />
      </Routes>
    </Router>
  );
};

export default App;
