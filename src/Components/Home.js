import { fetchHotels } from '../Data/hotelService';
import React, { useState, useEffect } from 'react';
import { useCart } from '../Data/CartContext';

function Home() {
  const [hotels, setHotels] = useState([]);
  const { state } = useCart();

  useEffect(() => {
    const getHotels = async () => {
      const fetchedHotels = await fetchHotels();
      setHotels(fetchedHotels);
    };
    getHotels();
  }, []);

    return (
      <>
      <section id="hero" className="grid hero-section">
          <article className="hero-details">
            <p className="title-large">Your tranquillity oasis awaits</p>
            <p className="text-middle">TranquilTravels is designed to help you find a serene retreat for your next holidays. With us searching for the hotels nestled amidst picturesque landscapes is easier than ever. </p>
            <div className="hero-cards">
              <div className="card-image">
                <p className="chip">New hotels <img src="./Assets/Arrow.png" alt="Arrow" /></p>
              </div>
              <div className="card-image">
                <p className="chip">Best reviews <img src="./Assets/Arrow.png" alt="Arrow" /></p>
              </div>
            </div>
          </article>
          <div className="hero-image-container"></div>
        </section>
        
        <section className="browse-hero-section">
          <article className="hero-details">
            <p className="title-large">Welcome, your tranquility oasis awaits</p>
          </article>
        </section>
        <section id="browse" className="browse-section">
          <p className="title-middle">Explore the hotels</p>
          <input className="searchbar" placeholder="Search by hotel name, place etc." />
          <section className="grid hotel-cards">
            {state.favorites.map(hotel => (
              <article key={hotel.id} className="hotel-card">
                <div className="card-image">
                  <p className="chip">{hotel.city}</p>
                </div>
                <p className="text-middle">{hotel.name}</p>
                <p className="text-small">{hotel.description}</p>
                <div className="hotel-card-footer">
                  <p className="text-middle">{hotel.rating}</p>
                  <p className="text-middle">{hotel.price}</p>
                </div>
              </article>
            ))}
          </section>
          <button className="button secondary" >Find more <img src="./Assets/Arrow.png" alt="Arrow" /></button>
  
        </section>
        <section id="rent" className="footer grid">
          <div className="card-image"></div>
          <article className="footer-details">
            <p className="title-large">Rent with us!</p>
            <p className="text-middle">If you’re a hotel or an apartment owner who’s looking to reach more customers you can now rent your property with TranquilTravels. </p>
            <button className="button secondary">Learn more <img src="./Assets/Arrow.png" alt="Arrow" /></button>
          </article>
        </section>
      </>
    );
  }

export default Home;