import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import APODCard from './APODCard';
import { useState } from 'react';

export default function PicturesScreen({ navigation }) {
  const [dates, setDates] = useState([]);
  const [latestDate, setLatestDate] = useState(new Date());

  function fetchNextPage() {
    const additionalDates = [];

    for (let i = 1; i < 6; i++) {
      const changeableDate = new Date(latestDate.getTime());
      latestDate?.setDate(changeableDate?.getDate() - i);
      additionalDates.push(changeableDate);
      setLatestDate(changeableDate);
    }

    setDates([...dates, ...additionalDates]);
  }

  return (
    <View>
      <FlatList
        style={{ padding: 20 }}
        data={dates}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.push('APODPage', { date: item.toISOString() });
            }}
          >
            <APODCard date={item.toISOString()} />
          </TouchableOpacity>
        )}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.8}
        key={(item) => item}
        ListFooterComponent={<ActivityIndicator size={'large'} />}
      />
    </View>
  );
}
