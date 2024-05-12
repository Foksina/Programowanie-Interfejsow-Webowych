import React from 'react';
import { Link } from 'react-router-dom';
import hotelData from '../data.js';

function BrowseHotels() {
  return (
    <section>
      <div className="browse-hero-section">
        <article className="hero-details">
          <p className="title-large">Welcome, your tranquility oasis awaits</p>
        </article>
      </div>
      <div className="browse-section">
        <p className="title-middle">Explore the hotels</p>
        <input className="searchbar" placeholder="Search by hotel name, place, description etc." />
        <div className="grid hotel-cards">
          {hotelData.map(hotel => (
            <article key={hotel.id} className="hotel-card">
              <div className="card-image">
                <p className="chip">{hotel.city}</p>
                <p className="heart">❤</p>
              </div>
              <p className="text-middle">{hotel.name}</p>
              <p className="text-small">{hotel.description}</p>
              <div className="hotel-card-footer">
                <p className="text-middle">{hotel.rating}</p>
                <p className="text-middle">{hotel.price}</p>
              </div>
              <Link to={`/hotels/${hotel.id}`} className="primary button">View offer <img src="./Assets/Arrow.svg" alt="Arrow" /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrowseHotels;
