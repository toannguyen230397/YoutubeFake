import { View, Text, TouchableOpacity, Image, StatusBar, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AlbumAppbar from '../compoments/AlbumAppbar';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PickerImage, PickerVideo, FullscreenHandler } from '../helper_function/functions';
import { Video, VideoFullscreenUpdate } from 'expo-av';
import DropDown from '../compoments/DropDown';
import { HandlerPostVideo } from '../api/Post';
import { ShowToast } from '../helper_function/functions';

export default function PostVideo() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [title, setTile] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const [type, setType] = useState('Không Có');
  const [isLoading, setIsLoading] = useState(0);
  const [step, setStep] = useState(0);
  const videoRef = React.useRef(null);

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

  const seLectVideoPress = async () => {
    if (user != '') {
      setIsLoading(true);
      await PickerVideo(setVideo, setImage, setStep, Alert).then(() => {
        setIsLoading(false);
      });
    }
    else {
      Alert.alert('Thông báo', 'Bạn cần đăng nhập để thực hiện chức năng này!');
    }
  }

  const selectedImage = async () => {
    setIsLoading(true);
    await PickerImage(setImage).then(() => {
      setIsLoading(false);
    });
  }

  const HandlerPostButton = () => {
    if(title == '')
    {
      Alert.alert('Thông báo', 'Vui lòng nhập tiêu đề cho Video này!');
    }
    else if(video != '' && image != '' && title != '')
    {
      setIsLoading(true);
      HandlerPostVideo(image, video, title, user, type, Alert).then(() => {
        setImage('');
        setVideo('');
        setIsLoading(false);
        navigation.goBack();
      });
    }
    else
    {
      console.log('error');s
    }
  }

  const render = () => {
    if (step == 0) {
      return <View style={{ flex: 1 }}>
        <AlbumAppbar
          title='Đăng Video'
          lefticon={require('../assets/YTB/back.png')}
          lefticonpress={goBack}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <View style={{ padding: 10, backgroundColor: '#edf0ef', borderRadius: 20 }}>
            <Image style={{ width: 100, height: 100 }} source={require('../assets/upload.png')} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Chọn video trong thư viện thiết bị để tải lên</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 10, textAlign: 'center', opacity: 0.5 }}>Lưu ý rằng kích thước file chỉ giới hạn không được lớn hơn 100mb</Text>
          </View>
          <TouchableOpacity onPress={() => seLectVideoPress()}>
            <LinearGradient colors={['red', 'black']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ marginTop: 20, width: 150, padding: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              {isLoading == true
                ? <ActivityIndicator color={'white'} />
                : <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Đăng Video</Text>
              }
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    }
    else if (step == 1) {
      return <View style={{ flex: 1, backgroundColor: 'black' }}>
        <AlbumAppbar
          title='Chạy Demo'
          lefticon={require('../assets/YTB/back.png')}
          lefticonpress={() => setStep(0)}
          righticon={require('../assets/YTB/next.png')}
          righticonpress={() => setStep(2)}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <Video
            ref={videoRef}
            style={{ width: windowWidth, height: windowHeight * 0.3 }}
            source={{
              uri: video
            }}
            useNativeControls
            resizeMode="stretch"
            shouldPlay
            isLooping
            onReadyForDisplay={() => setIsLoading(false)}
            onFullscreenUpdate={FullscreenHandler}
          />
        </View>
      </View>
    }
    else {
      return <View style={{ flex: 1 }}>
        <AlbumAppbar
          title='Thêm Chi Tiết'
          lefticon={require('../assets/YTB/back.png')}
          lefticonpress={() => setStep(1)}
        />
        <View style={{ flex: 1 }}>
          {image != ''
          ? <TouchableOpacity onPress={() => selectedImage()}>
              <Image style={{ width: windowWidth, height: windowHeight * 0.3, resizeMode: 'stretch' }} source={{ uri: image }} />
              <View style={{width: 50, height: 50, borderRadius: 100, backgroundColor: 'black', position: 'absolute', opacity: 0.4, justifyContent: 'center', alignItems: 'center', margin: 10}}>
                <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>+</Text>
              </View>
            </TouchableOpacity>
          : null
          }
          <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#cfcfcf', alignItems: 'center' }}>
            <Image style={{ width: 50, height: 50, borderRadius: 100, borderWidth: 1, borderColor: '#cfcfcf' }} source={require('../assets/avatar.jpg')} />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {user}</Text>
          </View>
          <View style={{padding: 10,  borderBottomWidth: 1, borderColor: '#cfcfcf',}}>
            <Text>Tiêu đề: </Text>
            <View style={{ height: 100 }}>
                <TextInput
                  style={{
                    textAlignVertical: 'top',
                    fontSize: 20
                  }}
                  multiline={true}
                  value={title}
                  placeholder='Tạo tiêu đề Video của bạn...'
                  onChangeText={(text) => { setTile(text) }}
                />
            </View>
          </View>
          <View style={{padding: 10,  borderBottomWidth: 1, borderColor: '#cfcfcf'}}>
            <DropDown setType={setType}/>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end', margin: 10 }}>
            <TouchableOpacity onPress={() => HandlerPostButton()}>
              <LinearGradient colors={['red', 'black']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ width: '100%', padding: 10, borderRadius: 10 }}>
                {isLoading == true
                  ? <ActivityIndicator size={'large'} color={'white'} />
                  : <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tải lên</Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor='black' barStyle='light-content' />
      {render()}
    </SafeAreaView>
  )
}