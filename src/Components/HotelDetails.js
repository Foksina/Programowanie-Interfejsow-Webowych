import { fetchHotelById } from '../Data/hotelService';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../Data/CartContext';

function HotelDetails() {
  const { id } = useParams();
  const hotelId = parseInt(id);
  const [hotel, setHotel] = useState(null);
  const [message, setMessage] = useState('');
  const { state, dispatch } = useCart();

  useEffect(() => {
    const getHotel = async () => {
      const fetchedHotel = await fetchHotelById(hotelId);
      setHotel(fetchedHotel);
    };
    getHotel();
  }, [hotelId]);

  const handleSend = () => {
    toast.success('WYSŁANO');
  };

  const toggleFavorite = () => {
    if (state.favorites.some(fav => fav.id === hotel.id)) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: hotel.id });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: hotel });
    }
  };

  const isFavorite = state.favorites.some(fav => fav.id === hotelId);

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <>
      <section className="hotel-hero-section">
        <article className="hero-details">
          <p className="title-large">{hotel.name}</p>
        </article>
      </section>
      <section className="grid hotel-section">
        <div className="hotel-image-container">
          <img src={hotel.image} alt={hotel.name} />
          <p className="favourite-heart" onClick={toggleFavorite}>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</p>
        </div>
        <article className="hotel-details">
          <div className="basic-info">
            <p className="main-info"><b>Location:</b> {hotel.city}</p>
            <p className="main-info"><b>Local category:</b> {hotel.rating}</p>
            <p className="main-info"><b>Price:</b> {hotel.price}</p>
            <p className="main-info"><b>Description:</b></p>
          </div>
          <p className="text-middle">{hotel.description}</p>

          <div className="contact-form">
            <h3>Contact the owner</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
            />
            <button onClick={handleSend} className="hotel-button">Send ✉</button>
          </div>

          <button className="hotel-button">Contact ✉</button>
          <div className="hero-cards">
            <div className="card-image"></div>
            <div className="card-image"></div>
          </div>
        </article>
      </section>
      <ToastContainer />
    </>
  );
}

export default HotelDetails;
