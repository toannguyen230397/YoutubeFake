import { View, Text, Button, SafeAreaView, Image, TouchableOpacity, StatusBar, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from "@react-navigation/native";
import { Video } from 'expo-av';
import styles from '../style/DetailStyle';
import { Dimensions } from 'react-native';
import VideoList from '../compoments/VideoList';
import { GetListDataVideo, GetVideoInteracts } from '../api/GetData';
import CommentModal from '../compoments/CommentModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShowToast, FullscreenHandler, formatTimestamp } from '../helper_function/functions';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { InteractHanlder, RemoveInteractHanlder, handlerView } from '../api/Interacts';

export default function Detail() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [datas, setDatas] = useState([]);
  const [likedatas, setLikeDatas] = useState([]);
  const [disLikedatas, setDisLikeDatas] = useState([]);
  const [commentdatas, setCommentDatas] = useState([]);
  const [savedatas, setSaveDatas] = useState([]);
  const videoRef = React.useRef(null);
  const route = useRoute();
  const [videoLoad, setVidaoLoad] = useState(true);
  const [user, setUser] = useState('');
  const [lastPress, setLastPress] = useState(0);
  const [moreSpace, setMoreSpace] = useState(false);

  const getData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      setUser(storedUser || '');
    } catch (error) {
      console.log('Đã xảy ra lỗi:', error);
    }
  };

  const handleDoubleTap = () => {
    const currentTime = Date.now();
    const delta = currentTime - lastPress;

    const DOUBLE_PRESS_DELAY = 500; // mức thời gian để xác định press 2 lần liên tục
    if (delta < DOUBLE_PRESS_DELAY) {
      setMoreSpace(!moreSpace);
    }

    setLastPress(currentTime);
  };

  const likeHandler = async () => {
    if (user != '') {
      const existingLikeIndex = likedatas.findIndex((data) => data.Username === user);
      const existingDisLikeIndex = disLikedatas.findIndex((data) => data.Username === user);

      const newLikeData = {
        "MaTT": Date.now(), // Gán MaTT theo giá trị mong muốn
        "MaVD": route.params.MaVD, // Gán MaVD theo giá trị mong muốn
        "PostTime": Date.now(), // Lấy thời gian hiện tại
        "Title": "Like",
        "Type": "Like",
        "Username": user,
      };

      if (existingDisLikeIndex !== -1) {
        await InteractHanlder(route.params.MaVD, user, 'Like', 'Like', Alert);
        await RemoveInteractHanlder(route.params.MaVD, user, 'DisLike');
        setLikeDatas(prevDatas => {
          const newData = [...prevDatas, newLikeData];
          return newData;
        });

        setDisLikeDatas(prevDatas => {
          const newData = prevDatas.filter(data => data.Username !== user);
          return newData;
        });
      } else if (existingLikeIndex === -1) {
        await InteractHanlder(route.params.MaVD, user, 'Like', 'Like', Alert);
        setLikeDatas(prevDatas => {
          const newData = [...prevDatas, newLikeData];
          return newData;
        });
      } else {
        await RemoveInteractHanlder(route.params.MaVD, user, 'Like');
        setLikeDatas(prevDatas => {
          const newData = prevDatas.filter(data => data.Username !== user);
          return newData;
        });
      }
    }
    else {
      ShowToast('error', 'Thông báo', 'Bạn cần đăng nhập để like video này!');
    }
  };

  const disLikeHandler = async () => {
    if (user != '') {
      const existingLikeIndex = likedatas.findIndex((data) => data.Username === user);
      const existingDisLikeIndex = disLikedatas.findIndex((data) => data.Username === user);

      const newDisLikeData = {
        "MaTT": Date.now(), // Gán MaTT theo giá trị mong muốn
        "MaVD": route.params.MaVD, // Gán MaVD theo giá trị mong muốn
        "PostTime": Date.now(), // Lấy thời gian hiện tại
        "Title": "DisLike",
        "Type": "DisLike",
        "Username": user,
      };

      if (existingLikeIndex !== -1) {
        await InteractHanlder(route.params.MaVD, user, 'DisLike', 'DisLike', Alert);
        await RemoveInteractHanlder(route.params.MaVD, user, 'Like');
        setDisLikeDatas(prevDatas => {
          const newData = [...prevDatas, newDisLikeData];
          return newData;
        });

        setLikeDatas(prevDatas => {
          const newData = prevDatas.filter(data => data.Username !== user);
          return newData;
        });
      } else if (existingDisLikeIndex === -1) {
        await InteractHanlder(route.params.MaVD, user, 'DisLike', 'DisLike', Alert);
        setDisLikeDatas(prevDatas => {
          const newData = [...prevDatas, newDisLikeData];
          return newData;
        });
      } else {
        await RemoveInteractHanlder(route.params.MaVD, user, 'DisLike');
        setDisLikeDatas(prevDatas => {
          const newData = prevDatas.filter(data => data.Username !== user);
          return newData;
        });
      }
    }
    else {
      ShowToast('error', 'Thông báo', 'Bạn cần đăng nhập để dislike video này!');
    }
  };

  const saveHandler = async () => {
    if (user != '') {
      const existingSaveIndex = savedatas.findIndex((data) => data.Username === user);

      const newSaveData = {
        "MaTT": Date.now(), // Gán MaTT theo giá trị mong muốn
        "MaVD": route.params.MaVD, // Gán MaVD theo giá trị mong muốn
        "PostTime": Date.now(), // Lấy thời gian hiện tại
        "Title": "Save",
        "Type": "Save",
        "Username": user,
      };

      if (existingSaveIndex === -1) {
        await InteractHanlder(route.params.MaVD, user, 'Save', 'Save', Alert);
        setSaveDatas(prevDatas => {
          const newData = [...prevDatas, newSaveData];
          return newData;
        });
        ShowToast('success', 'Thông báo', 'Lưu video thành công!');
      } else {
        ShowToast('error', 'Thông báo', 'Thất bại, bạn đã lưu video này rồi!');
      }
    }
  }

  const ListHeaderCompoment = () => (
    <View>
      <View style={styles.video_detail_container}>
        <Text style={styles.video_detail_title}>{route.params.TenVD}</Text>
        <Text style={{ fontWeight: '600', color: '#9E9E9E' }}>{route.params.LuotXem} {route.params.LuotXem <= 1 ? 'View' : 'Views'} - Đăng lúc: {formatTimestamp(route.params.PostTime)}</Text>
        <View style={{ paddingTop: 10, flexDirection: 'row' }}>
          <Image style={{ width: 30, height: 30, borderRadius: 100, borderWidth: 1, borderColor: '#edf0ef' }} source={require('../assets/avatar.jpg')} />
          <View style={{ width: '90%', paddingLeft: 10 }}><Text style={{ fontWeight: '600', fontSize: 18 }}>{route.params.Username}</Text></View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#edf0ef' }}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <TouchableOpacity onPress={() => likeHandler()}>
            <View style={styles.category}>
              <Image style={{ width: 30, height: 30 }} source={require('../assets/YTB/like.png')} />
              <Text>{likedatas.length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => disLikeHandler()}>
            <View style={{ paddingLeft: 10 }}>
              <View style={styles.category}>
                <Image style={{ width: 30, height: 30 }} source={require('../assets/YTB/dislike.png')} />
                <Text>{disLikedatas.length}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {user != ''
          ? user != route.params.Username
            ? <View style={{ padding: 10 }}>
              <TouchableOpacity onPress={() => saveHandler()}>
                <View style={[styles.category]}>
                  <Text style={{ fontWeight: 'bold' }}>Lưu Video</Text>
                </View>
              </TouchableOpacity>
            </View>
            : null
          : null
        }
      </View>
      <CommentModal user={user} MaVD={route.params.MaVD} commentdatas={commentdatas} setCommentDatas={setCommentDatas} />
    </View>
  )

  useEffect(() => {
    handlerView(route.params.MaVD);
    getData();
    GetListDataVideo(setDatas, '', route.params.MaVD, 'Detail');
    GetVideoInteracts(setLikeDatas, setDisLikeDatas, setCommentDatas, setSaveDatas, route.params.MaVD);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar backgroundColor='black' barStyle='light-content' />
        {videoLoad == true
          ? <View style={{ position: 'absolute', width: windowWidth, height: windowHeight * 0.3, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} color={'red'} />
          </View>
          : null
        }
        <TouchableOpacity activeOpacity={1} onPress={() => handleDoubleTap()}>
          <Video
            ref={videoRef}
            style={{ width: windowWidth, height: moreSpace == false ? windowHeight * 0.3 : windowHeight * 0.35 }}
            source={{
              uri: route.params.URL
            }}
            useNativeControls
            resizeMode="stretch"
            shouldPlay
            isLooping
            onFullscreenUpdate={FullscreenHandler}
            onReadyForDisplay={() => setVidaoLoad(false)}
          />
        </TouchableOpacity>
        <VideoList datas={datas} screen={'Detail'} ListHeader={ListHeaderCompoment} />
      </View>
      <Toast />
    </SafeAreaView>
  )
}