import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchHotels } from '../Data/hotelService'; 

function BrowseHotels() {
  const [hotels, setHotels] = useState([]);
  const [sortAttribute, setSortAttribute] = useState('name'); // Domyślnie sortowanie po nazwie

  useEffect(() => {
    const getHotels = async () => {
      const fetchedHotels = await fetchHotels();
      console.log(fetchedHotels); // do sprawdzenia danych
      setHotels(fetchedHotels);
    };
    getHotels();
  }, []);

  // Funkcja do sortowania hoteli
  const sortHotels = (hotels, attribute) => {
    return hotels.sort((a, b) => {
      if (a[attribute] < b[attribute]) return -1;
      if (a[attribute] > b[attribute]) return 1;
      return 0;
    });
  };

  // Obsługa zmiany atrybutu sortowania
  const handleSortChange = (e) => {
    setSortAttribute(e.target.value);
  };

  const sortedHotels = sortHotels([...hotels], sortAttribute);

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
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortAttribute} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="city">City</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>
       
        <div className="grid hotel-cards">
          {sortedHotels.map(hotel => (
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
