import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/reduxHook';
import { getCategories } from './api/actions';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '@utils/Constants';
import { FlatList } from 'react-native-gesture-handler';
import { navigate } from '@navigation/NavigationUtil';

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(state => state.categories);

  useEffect(() => {
    console.log("Dispatching getCategories...");
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SafeAreaView />
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subTitle}>Explore our wide range of categories</Text>
      </View>

     {
      loading ? 
      <ActivityIndicator size='small' color='black'/>:
      <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({item}) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => navigate('products',{id : item._id, name: item.name})}>
          <Image source={{uri : item?.image_uri}} style={styles.image}/>
          <Text style={styles.name}>{item?.name}</Text>
        </TouchableOpacity>
      )}
      ListFooterComponent={<>
      {error && 
      <Text style={styles.subTitle}>There was an error</Text>
      }
      </>}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      />
     }
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F9EC',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: RFValue(18),
    fontFamily: FONTS.heading,
    fontWeight: 'bold',
    color: '#333',
  },
  subTitle: {
    fontSize: RFValue(13),
    color: '#666',
    marginTop: 5,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  name: {
    marginTop: 10,
    fontSize: RFValue(12),
    fontWeight: '500',
    color: '#000',
  },
});