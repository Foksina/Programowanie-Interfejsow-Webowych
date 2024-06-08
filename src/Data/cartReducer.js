export const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites')) || [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      if (!state.favorites.some(fav => fav.id === action.payload.id)) {
        const updatedFavorites = [...state.favorites, action.payload];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        return { ...state, favorites: updatedFavorites };
      }
      return state;
    case 'REMOVE_FROM_FAVORITES':
      const filteredFavorites = state.favorites.filter(item => item.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
      return { ...state, favorites: filteredFavorites };
    default:
      return state;
  }
};
