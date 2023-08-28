import { View, Text, FlatList, StyleSheet, Animated } from 'react-native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Test() {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 50], // Thay đổi khoảng cách cuộn theo yêu cầu của bạn
    outputRange: [0, 50], // Thay đổi chiều cao header khi cuộn
    extrapolate: 'clamp',
  });

  const headerHeight_translate_y = scrollY.interpolate({
    inputRange: [0, 50], // Thay đổi khoảng cách cuộn theo yêu cầu của bạn
    outputRange: [0, 50], // Thay đổi chiều cao header khi cuộn
    extrapolate: 'clamp',
  });

  const headerHeight_opacity = scrollY.interpolate({
    inputRange: [0, 50], // Thay đổi khoảng cách cuộn theo yêu cầu của bạn
    outputRange: [0, 1], // Thay đổi chiều cao header khi cuộn
    extrapolate: 'clamp',
  });

  const datas = [
    {
      item: 1
    },
    {
      item: 2
    },
    {
      item: 3
    },
    {
      item: 4
    },
  ]

  const renderItems = (data) => (
    <View style={{width: 300, height: 300, margin: 10, backgroundColor: 'grey', borderRadius: 10}}>
      <Text>{data.item.item}</Text>
    </View>
  )

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Animated.View style={{ height: headerHeight, transform: [{translateY: headerHeight_translate_y}], opacity: headerHeight_opacity }}>
          {/* Đây là phần header của bạn */}
          <View style={{backgroundColor: 'blue', width: '100%', height: 200}}>
            <Text>abc</Text>
          </View>
        </Animated.View>
        <Animated.FlatList
          data={datas}
          renderItem={renderItems}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        />
      </View>
    </SafeAreaView>
  )
}