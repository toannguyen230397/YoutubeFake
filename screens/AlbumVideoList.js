import { View, Text, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import AlbumAppbar from '../compoments/AlbumAppbar';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetAlbumVideo } from '../api/GetData';
import { formatTimestamp } from '../helper_function/functions';

export default function AlbumVideoList() {
    const navigation = useNavigation();
    const route = useRoute();
    const [datas, setDatas] = useState([]);

    const goBack = () => (
        navigation.goBack()
    )

    useEffect(() => {
        GetAlbumVideo(setDatas, route.params.user, route.params.screen);
    }, []);

    const renderVideoItems = (data) => (
        <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#edf0ef'}}>
            <View style={{flex: 4}}>
            <TouchableOpacity onPress={() => navigation.navigate("Detail", data.item)}>
                <Image style={{ width:'100%', height: 100}} source={{ uri: data.item.Hinh }} />
            </TouchableOpacity>
            </View>
            <View style={{ flex: 6, paddingLeft: 10}}>
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{data.item.TenVD}</Text>
                    <Text style={{ color: '#a9abaa'}}>Đăng bởi: {route.params.user == data.item.Username ? 'Bạn' : data.item.Username}</Text>
                    <Text style={{ color: '#a9abaa'}}>Đăng lúc: {formatTimestamp(data.item.PostTime)}</Text>
                </View>
                <Text>{data.item.Title}</Text>
            </View>
        </View>
    )

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor='black' barStyle='light-content' />
          <AlbumAppbar
            title={route.params.screen == 'save' ? 'Video Đã Lưu' : 'Video Của Bạn'}
            lefticon={require('../assets/YTB/back.png')}
            lefticonpress={goBack}
          />
          <FlatList
            data={datas}
            renderItem={renderVideoItems}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    )
}