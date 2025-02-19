import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { FC } from 'react';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import { navigate } from '@navigation/NavigationUtil';
import { Colors, screenWidth } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';

const Categories: FC<{ data: any }> = ({ data }) => {
  const renderItem = ({ item }: any) => {
    return (
      <Pressable onPress={() => navigate('Categories')} style={styles.itemContainer}>
        <Image source={{ uri: item?.image_uri }} style={styles.regularFoodImage} />
        <Text style={styles.nameText}>{item?.name}</Text>
      </Pressable>
    );
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        numColumns={Math.ceil(data?.data?.length / 2)}
        data={data?.data}
        renderItem={renderItem}
        scrollEnabled={false}
        keyExtractor={(item) => item?.id?.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        style={styles.listContentContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
  listContentContainer: {
    marginVertical: 20,
    marginHorizontal: 15,
  },
  itemContainer: {
    marginRight: 15,
    width: screenWidth * 0.2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  regularFoodImage: {
    width: screenWidth * 0.12,
    height: screenWidth * 0.12,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  nameText: {
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.text,
    fontSize: RFValue(10),
  },
});

export default Categories;