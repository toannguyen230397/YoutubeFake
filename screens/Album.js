import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import AlbumAppbar from '../compoments/AlbumAppbar';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Album() {
  const navigation = useNavigation();
  const [user, setUser] = useState('');

  const goBack = () => (
    navigation.goBack()
  )

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor='black' barStyle='light-content' />
        <AlbumAppbar
          title='Album'
          lefticon={require('../assets/YTB/back.png')}
          lefticonpress={goBack}
        />
        <TouchableOpacity onPress={() => navigation.navigate('AlbumVideolist', {screen: 'own', user: user})}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#edf0ef' }}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/YTB/arrow.png')} />
            <Text style={{ fontWeight: 'bold' }}>Video của bạn</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AlbumVideolist', {screen: 'save', user: user})}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderColor: '#edf0ef' }}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/YTB/arrow.png')} />
            <Text style={{ fontWeight: 'bold' }}>Video đã lưu</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}