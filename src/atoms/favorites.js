import { atom, useAtom } from 'jotai';

export const favoritesAtom = atom(['2023-05-22']);

export function useFavorites() {
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  function isFavorite(targetDate) {
    return favorites.indexOf(targetDate) !== -1;
  }

  function toggleFavorite(date) {
    if (isFavorite(date)) {
      favoritesWithoutTargetDate = favorites.filter((d) => d !== date);
      setFavorites((favs) => [...favoritesWithoutTargetDate]);
      return false;
    } else {
      setFavorites((favs) => [...favs, date]);
      return true;
    }
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}
