import hotelData from '../data';
import { useParams } from 'react-router-dom';

function HotelDetails() {
  const { id } = useParams();
  const hotelId = parseInt(id);
  const hotel = hotelData.find(h => h.id === hotelId);

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
          <p className="favourite-heart">Add to favorites ♡</p>
        </div>
        <article className="hotel-details">
          <div className="basic-info">
            <p className="main-info"><b>Location:</b> {hotel.city}</p>
            <p className="main-info"><b>Local category:</b> {hotel.rating}</p>
            <p className="main-info"><b>Price:</b> {hotel.price}</p>
            <p className="main-info"><b>Description:</b></p>
          </div>
          <p className="text-middle">{hotel.description}</p>
          <button className="hotel-button">Contact ✉</button>
          <div className="hero-cards">
            <div className="card-image"></div>
            <div className="card-image"></div>
          </div>
        </article>
      </section>
    </>
  );
}

export default HotelDetails;
