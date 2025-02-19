import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, Platform, RefreshControl, StyleSheet, View } from 'react-native';
import React, { FC, useRef, useState } from 'react';
import { dynamicDashboardData as fullData } from '@utils/db';
import AdCarousal from '../organisms/AdCarousal';
import Categories from '../organisms/Categories';

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
  ad_carousal: AdCarousal,
  categories: Categories,
};

const PAGE_SIZE = 4;

const MainList: FC<{ scrollYGlobal: any }> = ({ scrollYGlobal }) => {
  const [isRefreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(fullData.slice(0, PAGE_SIZE));
  const [isLoading, setIsLoading] = useState(false);

  const prevScrollY = useRef(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event?.nativeEvent?.contentOffset.y;
    scrollYGlobal.value = currentScrollY;
    prevScrollY.current = currentScrollY;
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setCurrentPage(1);
      setData(fullData.slice(0, PAGE_SIZE));
      setRefreshing(false);
    }, 3000);
  };

  const handleLoadMore = () => {
    if (isLoading) return;
    if (data?.length >= fullData?.length) return;

    setIsLoading(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const newItems = fullData?.slice(0, nextPage * PAGE_SIZE);
      setData(newItems);
      setCurrentPage(nextPage);
      setIsLoading(false);
    }, 4000);
  };

  const renderItem = ({ item }: any) => {
    const SectionComponent = sectionComponents[item?.type];
    return SectionComponent ? <SectionComponent data={item} /> : null;
  };

  return (
    <FlatList
      data={data}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      overScrollMode="always"
      onScroll={handleScroll}
      ref={flatListRef}
      scrollEventThrottle={16}
      renderItem={renderItem}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      nestedScrollEnabled
      contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? 200 : 300 }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={
        isLoading ? (
          <ActivityIndicator size="small" color="#388" style={{ alignSelf: 'center', margin: 15 }} />
        ) : null
      }
    />
  );
};

export default MainList;

const styles = StyleSheet.create({});