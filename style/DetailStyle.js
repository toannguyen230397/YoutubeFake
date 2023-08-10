import { StyleSheet } from 'react-native'

export default styles=StyleSheet.create({
    container:{
        flex: 1
    },
    video_detail_container: {
        margin: 10
    },
    video_detail_title: {
        fontSize: 17,
        fontWeight: '600'
    },
    category: {
        width: 100,
        height: 40,
        backgroundColor: '#E0E0E0',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    video_detail: {
        flexDirection: 'row',
        width: '90%',
        padding: 10
    }
})