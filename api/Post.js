import { firebaseConfig } from "../firebaseconfig";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ShowToast } from "../helper_function/functions";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const imageName = 'Image-' + Date.now().toString();
const videoName = 'Video-' + Date.now().toString();
const storageThumbnailRef = ref(storage, 'Thumbnails/' + imageName);
const storageVideolRef = ref(storage, 'Videos/' + videoName);
const storageRef = ref(storage, 'AvatarUsers/' + imageName);

const getBlobFroUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });

    return blob;
};

export const HandlerPostVideo = async (image, video, title, user, type, Alert) => {
    try {
        const imageBlob = await getBlobFroUri(image);
        const videoBlob = await getBlobFroUri(video);

        await uploadBytes(storageThumbnailRef, imageBlob);
        await uploadBytes(storageVideolRef, videoBlob);
        const imageUrl = await getDownloadURL(storageThumbnailRef);
        const videoUrl = await getDownloadURL(storageVideolRef);

        const response = await fetch('https://toanyoutubefake.000webhostapp.com/postVideo.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                hinh: imageUrl,
                theloai: type,
                username: user,
                video: videoUrl,
                posttime: Date.now(),
                luotxem: 0,
            })
        })
        const jsonResponse = await response.json();

        if (jsonResponse.length > 0) {
            if (jsonResponse[0].Message == 'true') {
                ShowToast('success', 'Thông báo', 'Tải Video lên thành công!');
            }
            else {
                Alert.alert("Thông báo!", jsonResponse[0].Message);
            }
        } else {
            console.log("Response is empty.");
        }
    } catch (error) {
        console.log(error);
    }
}