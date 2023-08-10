import { ShowToast } from "../helper_function/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginHanlder = async (username, password, setUser, Alert, navigation) => {
    try {
      const response = await fetch('https://toanyoutubefake.000webhostapp.com/Login.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })
      const jsonResponse = await response.json();
  
      if (jsonResponse.length > 0) {
        if(jsonResponse[0].Message == 'true')
        {
          await AsyncStorage.setItem('user', username);
          setUser(username);
          navigation.closeDrawer();
          ShowToast('success', 'Thông báo', 'Xin chào '+username);
        }
        else
        {
          Alert.alert("Thông báo!", jsonResponse[0].Message);
        }
      } else {
        console.log("Response is empty.");
      }
    } catch (error) {
      console.log(error);
    }
  }