import { View, Text, Modal, TextInput, Image, TouchableOpacity, FlatList, Keyboard, Alert } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { Dimensions } from 'react-native';
import { formatTimestamp } from '../helper_function/functions';
import { ShowToast } from '../helper_function/functions';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { InteractHanlder } from '../api/Interacts';

export default function CommentModal({user, MaVD, commentdatas, setCommentDatas}) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [isVisible, setIsVisible] = useState(false);
    const [input, setInput] = useState('');

    const addComment = (Username, Title) => {
        const newComment = {
            MaTT: Date.now(),
            MaVD: MaVD,
            PostTime: Date.now(),
            Title: Title,
            Type: 'Comment',
            Username: Username,
        };
        setCommentDatas(prevDatas => {
            const newData = [...prevDatas, newComment];
            newData.sort((a, b) => a.PostTime - b.PostTime);
            newData.reverse();
            return newData;
        });
    }

    const renderVideoComments = (data) => (
        <View style={{ flexDirection: 'row', padding: 10, marginBottom: 0, justifyContent: 'center'}}>
            <Image style={{ width: 30, height: 30, borderRadius: 100, borderWidth: 1, borderColor: '#edf0ef' }} source={require('../assets/avatar.jpg')} />
            <View style={{ marginLeft: 10, width: '90%', borderBottomWidth: 1, borderColor: '#edf0ef', paddingBottom: 5 }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{ fontWeight: 'bold' }}>{data.item.Username}</Text>
                    <Text style={{ color: '#a9abaa'}}>{formatTimestamp(data.item.PostTime)}</Text>
                </View>
                <Text>{data.item.Title}</Text>
            </View>
        </View>
    )

    const handerClose = () => {
        setInput('');
        setIsVisible(false);
    }

    const buttonPress = async() => {
        if(user)
        {
            await InteractHanlder(MaVD, user, 'Comment', input, Alert);
            addComment(user, input);
        }
        else
        {
            ShowToast('error', 'Thông báo', 'Bạn cần đăng nhập để gửi bình luận!')
        }
        setInput('');
        Keyboard.dismiss();
    }

    return (
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#edf0ef' }}>
            <TouchableOpacity onPress={() => { setIsVisible(true) }}>
                <Text style={{ fontWeight: 'bold' }}>
                    Bình Luận <Text style={{ color: 'grey' }}>{commentdatas.length}</Text>
                </Text>
            </TouchableOpacity>
            <Modal visible={isVisible} animationType="slide" transparent={true}>
                <BlurView intensity={50} style={{ flex: 1 }} tint={'dark'}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handerClose()}>
                            <View style={{ width: windowWidth, height: windowHeight * 0.3 }}></View>
                        </TouchableOpacity>
                        <View style={{ width: windowWidth, height: windowHeight * 0.7, backgroundColor: 'white', paddingBottom: 0 }}>
                            <View style={{flex: 9}}>
                                <FlatList
                                    data={commentdatas}
                                    renderItem={renderVideoComments}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                                <View style={{ backgroundColor: 'white', padding: 5, borderWidth: 1, borderColor: '#edf0ef', flexDirection: 'row' }}>
                                    <View style={{ flex: 9, justifyContent: 'center' }}>
                                        <View style={{height: 50, paddingLeft: 10, borderRadius: 10, borderWidth: 1, justifyContent: 'center', borderColor: 'grey' }}>
                                            <TextInput
                                                value={input}
                                                placeholder='Nhập bình luận...'
                                                onChangeText={(text) => { setInput(text) }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => buttonPress()}>
                                            <Image style={{ width: 30, height: 30 }} source={require('../assets/send.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </BlurView>
                <Toast/>
            </Modal>
        </View>
    )
}