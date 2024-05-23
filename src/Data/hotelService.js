import { firestore, auth } from '../Data/init';
import { addDoc, collection, query, where, serverTimestamp, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const fetchHotels = async () => {
  const hotelsCollectionRef = collection(firestore, 'Hotels');
  const querySnapshot = await getDocs(hotelsCollectionRef);
  const hotels = [];
  querySnapshot.forEach((doc) => {
    hotels.push({ id: doc.id, ...doc.data() });
  });
  return hotels;
};

export const fetchHotelById = async (hotelId) => {
    const hotelsCollectionRef = collection(firestore, 'Hotels');
    const querySnapshot = await getDocs(query(hotelsCollectionRef, where('id', '==', hotelId)));
  
    if (!querySnapshot.empty) {
      const hotelDocSnapshot = querySnapshot.docs[0]; // Załóżmy, że istnieje tylko jeden hotel o danym ID
      return { id: hotelDocSnapshot.id, ...hotelDocSnapshot.data() };
    } else {
      throw new Error(`Hotel with ID ${hotelId} does not exist.`);
    }
  };

export const createHotel = async (newHotel) => {
  try {
    const tempHotel = {
      ...newHotel,
      created: serverTimestamp(),
      userId: auth.currentUser.uid,
    };
    const hotelsCollectionRef = collection(firestore, 'hotels');
    const docRef = await addDoc(hotelsCollectionRef, tempHotel);
    console.log('Document added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export const updateHotel = async (hotelId, updatedHotel) => {
  const hotelDocRef = doc(firestore, 'hotels', hotelId);
  try {
    await updateDoc(hotelDocRef, updatedHotel);
    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
    throw error;
  }
};

export const deleteHotel = async (hotelId) => {
  const hotelDocRef = doc(firestore, 'hotels', hotelId);
  try {
    await deleteDoc(hotelDocRef);
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error deleting document: ', error);
    throw error;
  }
};
