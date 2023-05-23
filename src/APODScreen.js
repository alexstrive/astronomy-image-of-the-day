import { ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAPOD } from '../api';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { favoritesAtom, useFavorites } from './atoms/favorites';
import { FontAwesome } from '@expo/vector-icons';

export default function APODPage({ route, navigation }) {
  const { date } = route.params;
  const formattedDate = date.split('T')[0];

  const { data, isLoading } = useQuery({
    queryKey: ['planet', formattedDate],
    queryFn: () => getAPOD(formattedDate),
  });

  useEffect(() => {
    navigation.setOptions({
      title: data.title,
      headerRight: () => <FavoriteButton date={formattedDate} />,
    });
  }, []);

  return (
    <ScrollView>
      <Image
        style={{ width: '100%', height: 500 }}
        source={{ uri: data?.url }}
      />
      <Text style={{ padding: 20, fontSize: 18 }}>{data.explanation}</Text>
    </ScrollView>
  );
}

function FavoriteButton({ date }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isDateFavorite, setDateFavorite] = useState(isFavorite(date));

  return (
    <TouchableOpacity
      onPress={() => {
        const isFavoriteLocal = toggleFavorite(date);
        setDateFavorite(isFavoriteLocal);
      }}
    >
      {isDateFavorite ? (
        <FontAwesome name="bookmark" size={24} color="red" />
      ) : (
        <FontAwesome name="bookmark-o" size={24} color="black" />
      )}
    </TouchableOpacity>
  );
}
