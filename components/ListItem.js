import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";

const ListItem = (item) => (
  <React.Fragment key={item.id}>
    <View style={styles.item}>
      <Image
        style={styles.image}
        source={{
          uri: item.url_image_absolute,
        }}
      />
      <Text>{item.food_name}</Text>
    </View>
  </React.Fragment>
)

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginRight: 15
  },
  item: {
    padding: 15,
    marginTop: 5,
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
})

export default React.memo(ListItem)