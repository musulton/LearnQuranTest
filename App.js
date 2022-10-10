import React from "react";
import { SafeAreaView, FlatList, StyleSheet, ActivityIndicator } from "react-native";

import ListItem from "./components/ListItem";

export default function App() {
  const [data, setData] = React.useState([])
  const [loadingMore, setLoadingMore] = React.useState(false);

  const fetchData = async () => {
    try {
      setLoadingMore(true)
      let response = await fetch(
        'https://dev-dummy-api.jelantah.org/api/foods/get'
      );
      const json = await response.json();
      setData((prevData = []) => {
        return [
          ...prevData,
          ...json?.data?.data
        ]
      });
    } catch (error) {
       console.error(error);
    } finally {
      setLoadingMore(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const loadMoreData = async () => {
    if (loadingMore) return

    fetchData();
    await delay(1000)
  }
  
  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data}
        keyExtractor={(item) => "item_" + item.id}
        onEndReachedThreshold={0.2}
        onEndReached={loadMoreData}
        renderItem={({ item, index }) => <ListItem {...item} key={index} />}
      />
      {loadingMore && (<ActivityIndicator />)}
    </SafeAreaView>
  );
 }
 
const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1
  }
});