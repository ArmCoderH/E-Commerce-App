import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { FONTS, screenWidth } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from '@components/atoms/Icon';
import { FlatList } from 'react-native-gesture-handler';
import { navigate } from '@navigation/NavigationUtil';

const VerticalList: FC<{ data: any }> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.absoluteView, { backgroundColor: data?.bgColor }]} />
      <Text style={styles.headingText}>{data?.title}</Text>

      <Pressable style={[styles.button, { backgroundColor: data?.btnColor }]}>
        <Text style={styles.buttonText}>Explore More</Text>
        <Icon size={16} name="arrow-forward-sharp" iconFamily="Ionicons" color="#fff" />
      </Pressable>

      <FlatList
        data={data?.data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.itemContainer} onPress={() => navigate('Categories')}>
            <Image source={{ uri: item.image_uri }} style={styles.image} />
            <Text style={styles.productText}>{item?.title}</Text>
            <Text style={styles.subTitle}>{item?.subTitle}</Text>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default VerticalList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  absoluteView: {
    width: screenWidth,
    height: 180,
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  headingText: {
    fontSize: RFValue(16),
    fontFamily: FONTS.heading,
    color: '#222',
  },
  button: {
    padding: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 10,
    marginVertical: 15,
  },
  buttonText: {
    fontWeight: '400',
    color: '#fff',
    fontSize: RFValue(12),
  },
  itemContainer: {
    width: (screenWidth - 40) / 2 - 10, // Adjust width to fit two items per row with padding
    margin: 5,
    height: 220,
    marginBottom: 10, // Adjust marginBottom to reduce space between rows
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: '80%', // Adjust height to show full image
    resizeMode: 'cover',
    borderRadius : 5,
  },
  productText: {
    fontSize: RFValue(14),
    color: '#222',
    fontFamily: FONTS.heading,
    marginTop: 4,
    fontWeight : '500'
  },
  subTitle: {
    fontSize: RFValue(10),
    color: '#222',
    fontWeight: '400',
  },
  contentContainerStyle: {
    paddingBottom: 10,
  },
});