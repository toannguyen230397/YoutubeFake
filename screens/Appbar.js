import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from '../style/AppbarStyle';
import { useNavigation } from '@react-navigation/native';

export default function Appbar({datas, setSearchdatas}) {
  const [searchInput, setSearchInput] = useState('');
  const navigation = useNavigation();

  const openDrawer = () => (
    navigation.openDrawer()
  )

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = datas.filter(function (item) {
        const itemData = item.TenVD
          ? item.TenVD.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchdatas(newData);
      setSearchInput(text);
    } else {
      setSearchdatas(datas);
      setSearchInput(text);
    }
  };

  return (
      <View style= {{ marginRight: 10, marginTop: 10}}>
        <View style={styles.header}>
        <View style={{width:'30%'}}>
          <TouchableOpacity onPress={() => openDrawer()}>
            <Image style={{width:'100%', height:50}} source={require('../assets/YTB/Logo.jpg')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.body_search}>
          <TextInput
            value={searchInput}
            placeholder='Tìm kiếm...'
            onChangeText={(text) => { searchFilterFunction(text) }}
          />
        </View>
      </View>
      </View>
  )
}