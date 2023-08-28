import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { VideoFullscreenUpdate } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

const getFileInfo = async (fileURI) => {
  const fileInfo = await FileSystem.getInfoAsync(fileURI)
  return fileInfo
}

export const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
  const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
  return isOk
}



export const ShowToast = (type, text1, text2) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
}

export const formatTimestamp = (timestamp) => {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;

  // Tính toán số lượng ngày chênh lệch
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference >= 7) {
    // Nếu hơn một tuần, hiển thị ngày tháng dạng dd-mm-yy
    const date = new Date(timestamp);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate; 
  } else if (daysDifference > 0) {
    // Hiển thị x ngày trước
    return `${daysDifference} ngày trước`;
  } else {
    // Tính toán số lượng giờ chênh lệch
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursDifference > 0) {
      // Hiển thị x tiếng trước
      return `${hoursDifference} tiếng trước`;
    } else {
      // Tính toán số lượng phút chênh lệch
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));

      if (minutesDifference > 0) {
        // Hiển thị x phút trước
        return `${minutesDifference} phút trước`;
      } else {
        // Hiển thị "mới đây"
        return 'mới đây';
      }
    }
  }
}

export const PickerVideo = async (setVideo, setImage, setStep, Alert) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsMultipleSelection: false,
    quality: 1,
  });
  if (result.assets != null) {
    let selectedVideo = result.assets.map((asset) => asset.uri);
    const fileInfo = await getFileInfo(selectedVideo[0]);
    const isLt10MB = isLessThanTheMB(fileInfo.size, 100)
    if (!isLt10MB) {
      Alert.alert('Thông báo', 'Kích thước file video vượt quá mức 100MB');
    }
    else {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        selectedVideo[0],
        {
          time: 15000,
        }
      );
      setImage(uri);
      setVideo(selectedVideo[0]);
      setStep(1);
    }
  }
}

export const PickerImage = async (setImage) => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: false,
    aspect: [4, 3],
    quality: 1,
  });
  if (result.assets != null) {
    setImage(result.assets[0].uri);
  }
}

export const FullscreenHandler = ({ fullscreenUpdate }) => {
  switch (fullscreenUpdate) {
    case VideoFullscreenUpdate.PLAYER_WILL_PRESENT:
      console.log(' the fullscreen player is about to present');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      break;
    case VideoFullscreenUpdate.PLAYER_DID_PRESENT:
      console.log('the fullscreen player just finished presenting');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      break;
    case VideoFullscreenUpdate.PLAYER_WILL_DISMISS:
      console.log('the fullscreen player is about to dismiss');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      break;
    case VideoFullscreenUpdate.PLAYER_DID_DISMISS:
      console.log('the fullscreen player just finished dismissing');
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }
}

