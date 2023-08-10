import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Album from './screens/Album';
import AlbumVideoList from './screens/AlbumVideoList';
import PostVideo from './screens/PostVideo';
import CustomDrawer from './compoments/CustomDrawer';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

  const handerClearData = async() => {
    await AsyncStorage.clear();
  }

  useEffect(() => {
    handerClearData();
  }, []);

  const Root = () => {
    return (
      <Drawer.Navigator screenOptions={{ headerShown: false, drawerLabelStyle: {marginLeft: -25}, drawerActiveBackgroundColor: '#edf0ef',  drawerActiveTintColor: 'black' }} drawerContent={(props) => <CustomDrawer {...props} />} >
        <Drawer.Screen name='Trang chủ' component={Home} options={{ drawerIcon: () => ( <Image style={{ width: 30, height: 30 }} source={require('./assets/home.png')} /> )}} />
        <Drawer.Screen name='Đăng Video' component={PostVideo} options={{ drawerIcon: () => ( <Image style={{ width: 30, height: 30 }} source={require('./assets/add.png')} /> ), unmountOnBlur: true}} />
        <Drawer.Screen name='Album' component={Album} options={{ drawerIcon: () => ( <Image style={{ width: 30, height: 30 }} source={require('./assets/album.png')} /> ), unmountOnBlur: true}} />
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Root' component={Root} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Detail' component={Detail} />
        <Stack.Screen name='AlbumVideolist' component={AlbumVideoList} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}