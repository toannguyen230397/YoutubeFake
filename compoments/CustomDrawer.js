import { View, Text, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { LoginHanlder } from '../api/Login';
import { RegisterHanlder } from '../api/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDrawer(props) {
  const [headerState, setHeaderState] = useState(0);
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlerLogout = async() => {
    await AsyncStorage.clear();
    setUser('');
    setUsername('');
    setPassword('');
    setHeaderState(0);
    console.log('Logot');
  }

  const LogoutPress = () => {
    Alert.alert("Thông báo!", "Bạn muốn đăng xuất khỏi tài khoản không?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => handlerLogout() }
    ]);
  };

  const HandlerButtonPress = () => {
    if(username == '' || password == '')
    {
      Alert.alert("Thông báo!", "Bạn chưa nhập đủ thông tin!");
    }
    else
    {
      if(headerState == 1)
      {
        LoginHanlder(username, password, setUser, Alert, props.navigation);
      }
      else if(headerState == 2)
      {
        RegisterHanlder(username, password, setUser, Alert, props.navigation);
      }
      else
      {
        null
      }
    }
  }

  const HandlerComeback = () => {
    setUsername('');
    setPassword('');
    setHeaderState(0);
  }

  const LoginRegisterCompoment = () => {
    if (headerState == 0) {
      return <View style={{ width: '100%', padding: 25 }}>
      <TouchableOpacity onPress={() => setHeaderState(1)}>
        <LinearGradient colors={['white', 'grey']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ width: '100%', padding: 10, borderRadius: 10 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Đăng Nhập</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => setHeaderState(2)}>
          <Text style={{ color: 'red' }}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
    }
    if (headerState != 0) {
      return <View style={{ width: '100%', padding: 25 }}>
      <View style={{ height: 50, marginBottom: 10, padding: 10, borderRadius: 10, borderWidth: 1, justifyContent: 'center', borderColor: 'grey', backgroundColor: 'white' }}>
        <TextInput
          value={username}
          placeholder='Tên Đăng Nhập...'
          onChangeText={(text) => { setUsername(text) }}
        />
      </View>
      <View style={{ height: 50, marginBottom: 10, padding: 10, borderRadius: 10, borderWidth: 1, justifyContent: 'center', borderColor: 'grey', backgroundColor: 'white' }}>
        <TextInput
          value={password}
          placeholder='Mật khẩu...'
          secureTextEntry={true}
          onChangeText={(text) => { setPassword(text) }}
        />
      </View>
      <TouchableOpacity onPress={() => HandlerButtonPress()}>
        <LinearGradient colors={['white', 'grey']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ width: '100%', padding: 10, borderRadius: 10 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{headerState == 1 ? 'Đăng Nhập' : 'Đăng Ký'}</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Bạn muốn quay lại? </Text>
        <TouchableOpacity onPress={() => HandlerComeback()}>
          <Text style={{ color: 'red' }}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    </View>
    }
  }
  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: 'black' }}>
        <View style={{ flex: 1, height: 250, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
          {user == ''
          ? LoginRegisterCompoment()
          : <View style={{padding: 50}}>
              <LinearGradient colors={['white', 'grey']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ width: '100%', padding: 10, borderRadius: 10 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{user}</Text>
              </LinearGradient>
            </View>
          }
        </View>
        <View style={{ backgroundColor: 'white' }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {user != ''
      ? <TouchableOpacity onPress={LogoutPress}>
          <View style={{ padding: 20, borderTopWidth: 1, borderColor: '#edf0ef', flexDirection: 'row' }}>
            <Image style={{ width: 20, height: 20 }} source={require('../assets/logout.png')} />
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontWeight: 'bold', color: 'grey' }}>Log Out</Text>
            </View>
          </View>
        </TouchableOpacity> 
      : <View style={{padding: 20, borderTopWidth: 1, borderColor: '#edf0ef'}}></View>
      }
    </View>
  )
}