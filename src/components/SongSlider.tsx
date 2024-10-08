/* eslint-disable semi */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useProgress } from 'react-native-track-player'
import Slider from '@react-native-community/slider'

export default function SongSlider() {
    const {position , duration} = useProgress()

  return (
    <View style={styles.container}>
        <Slider
            value={position}
            minimumValue={0}
            maximumValue={duration}
            thumbTintColor="green"
            maximumTrackTintColor="#fff"
            style = {styles.container}
        />
        <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
                {new Date(position * 1000).toISOString().substring(15,19)}
            </Text>
            <Text style={styles.timeText}>
                {new Date((duration - position) * 1000).toISOString().substring(15,19)}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        width : 300,
        height : 50,
        margin :10,
        flexDirection : 'row',
    },
    timeContainer :{
        width:290,
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    timeText :{
        color : '#fff',
        fontWeight : 'bold',
        fontSize : 16,
    },
})
