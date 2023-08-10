import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import styles from '../style/HomeStyle'
import Appbar from './Appbar'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetListDataVideo, GetDataByType, GetVideoType } from '../api/GetData';
import VideoList from '../compoments/VideoList';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function Home() {
  const [refresh, setRefresh] = useState(true);
  const [datas, setDatas] = useState([]);
  const [typeDatas, setTypeDatas] = useState([]);
  const [searchdatas, setSearchdatas] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const HandlerGetData = () => {
    setDatas([]);
    setSearchdatas([]);
    GetListDataVideo(setDatas, setRefresh, '', 'Home');
  }

  const HandlerGetDataByType = (type) => {
    setDatas([]);
    setSearchdatas([]);
    setSelectedType(type);
    GetDataByType(setDatas, type);
  }

  useEffect(() => {
    HandlerGetData();
    GetVideoType(setTypeDatas);
  }, []);

  const onRefresh = () => {
    setSelectedType('');
    setDatas([]);
    HandlerGetData();
  }

  const renderVideoType = (data) => (
    <View>
      <TouchableOpacity onPress={() => HandlerGetDataByType(data.item.Theloai)}>
        <View style={selectedType == data.item.Theloai
        ? [styles.category, {backgroundColor: 'red'}]
        : [styles.category, {backgroundColor: '#E0E0E0'}]
        }>
          <Text style={selectedType == data.item.Theloai
          ? { fontWeight: '600', color: 'white' }
          : { fontWeight: '600' }
          }>
            {data.item.Theloai}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Appbar datas={datas} setSearchdatas={setSearchdatas} />
        <View style={{ marginTop: 10, padding: 5, borderWidth: 1, borderColor: '#edf0ef' }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={typeDatas}
            renderItem={renderVideoType}
          />
        </View>
        <VideoList searchdatas={searchdatas} datas={datas} refresh={refresh} onRefresh={onRefresh} screen={'Home'} />
      </View>
      <Toast/>
    </SafeAreaView>
  )
}