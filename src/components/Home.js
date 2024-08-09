import React from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
  const { dispatch } = useAppContext();

  const handleAddToCart = (item) => {
    dispatch({
      type: 'ADD_TO_CART',
      item: { ...item, image: item.image }, // Ensure image is included
    });
    console.log(`${item.name} added to the cart!`); // Check if this is printed in the console
    toast.success(`${item.name} added to the cart!`);
  };

  const plants = [
    { id: 1, name: 'Lavender Teracotta', price: 10, image: '/images/plant1.jpg' },
    { id: 2, name: 'Geranium Flower', price: 15, image: '/images/plant2.jpg' },
    { id: 3, name: 'Rose', price: 20, image: '/images/plant3.webp' },
    { id: 4, name: 'Jade', price: 25, image: '/images/plant4.jpg' },
    { id: 5, name: 'Vastu Plant', price: 30, image: '/images/plant5.jpg' },
    { id: 6, name: 'Guava Plant', price: 35, image: '/images/plant6.jpg' },
    { id: 7, name: 'Banana Leaf', price: 40, image: '/images/plant7.jpg' },
    { id: 8, name: 'Bougainvillea', price: 45, image: '/images/plant8.webp' },
  ];

  return (
    <div className="home">
      <h1>Available Plants</h1>
      <div className="plant-list">
        {plants.map((plant) => (
          <div key={plant.id} className="plant-item">
            <img src={plant.image} alt={plant.name} className="plant-image" />
            <h3>{plant.name}</h3>
            <p>Price: ${plant.price}</p>
            <button onClick={() => handleAddToCart(plant)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
