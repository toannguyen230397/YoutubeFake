import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../style/HomeStyle';
import { Dimensions } from 'react-native';
import { formatTimestamp } from '../helper_function/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VideoList({searchdatas, datas, refresh, onRefresh, screen}) {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [user, setUser] = useState('');

  const getData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      setUser(storedUser || '');
    } catch (error) {
      console.log('Đã xảy ra lỗi:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const ListEmpty  = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{marginBottom: 10}}>
        <Image style={{ width: windowWidth, height: windowHeight * 0.3 }} source={require('../assets/LoadingState.jpg')} />
      </View>
      <View style={{marginBottom: 10}}>
        <Image style={{ width: windowWidth, height: windowHeight * 0.3 }} source={require('../assets/LoadingState.jpg')} />
      </View>
      <View style={{marginBottom: 10}}>
        <Image style={{ width: windowWidth, height: windowHeight * 0.3 }} source={require('../assets/LoadingState.jpg')} />
      </View>
      <View style={{marginBottom: 10}}>
        <Image style={{ width: windowWidth, height: windowHeight * 0.3 }} source={require('../assets/LoadingState.jpg')} />
      </View>
    </View>
  )

  const renderVideoItems = (data) => (
    <View>
      <TouchableOpacity onPress={() => { screen == 'Home' ? navigation.navigate("Detail", data.item) : navigation.replace("Detail", data.item) }}>
        <Image style={{ width: windowWidth, height: windowHeight * 0.3, resizeMode: 'stretch' }}
          source={{ uri: data.item.Hinh }} />
      </TouchableOpacity>
      <View style={styles.video_detail}>
        <Image style={{ width: 30, height: 30, borderRadius: 100, borderWidth: 1, borderColor: '#edf0ef' }} source={require('../assets/avatar.jpg')} />
        <View style={{ paddingLeft: 10 }}>
          <View><Text style={{ fontSize: 17, fontWeight: '600' }}>{data.item.TenVD}</Text></View>
          <View style={{ flexDirection: 'row' }}>
            <View><Text style={{ fontWeight: '600', color: '#9E9E9E' }}>{data.item.Username}</Text></View>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              <Text style={{ fontWeight: '600', color: '#9E9E9E' }}>{data.item.LuotXem} {data.item.LuotXem <= 1 ? 'View' : 'Views'} - </Text>
              <Text style={{ fontWeight: '600', color: '#9E9E9E' }}>{formatTimestamp(data.item.PostTime)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      {screen == 'Home' 
      ? <FlatList
          data={searchdatas.length > 0
            ? searchdatas
            : datas
          }
          renderItem={renderVideoItems}
          ListEmptyComponent={ListEmpty}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
            />
          }
        />
      : <FlatList
          data={datas}
          renderItem={renderVideoItems}
          ListEmptyComponent={ListEmpty}
          showsVerticalScrollIndicator={false}
        />
      }
    </View>
  )
}