import { View, Image, Text, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAPOD } from '../api';
import { useFavorites } from './atoms/favorites';

export default function APODCard({ date }) {
  const formattedDate = date.split('T')[0];

  const { data, isLoading } = useQuery({
    queryKey: ['planet', formattedDate],
    queryFn: () => getAPOD(formattedDate),
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: data?.url }} style={styles.thumbnail} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{data?.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  thumbnail: {
    height: 300,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
