/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable semi */
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TrackPlayer, { State , usePlaybackState  } from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { playBackService } from '../../musicPlayerServices'


export default function ControlCentre() {
    const playBackState = usePlaybackState()
    const state = playBackState.state
    const skipToNext = async () => {
        await TrackPlayer.skipToNext()
    }
    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious()
    }

    const togglePlay = async (playback : State | undefined) => {
       try{
        const queue = await TrackPlayer.getQueue();
            //    .then((queue)=>{
            //         const currentTrack = queue[0]
            //         console.log(queue)
            //         console.log(currentTrack)
            //     })
        const currentTrack = queue[0]
        console.log(currentTrack)
        if(currentTrack !== null){
            if(playback === State.Playing || playback === State.Ready){
                await TrackPlayer.play()
            }else{
                await TrackPlayer.pause()
            }
        }
       }catch(error){
        console.log(error)
       }

    }

  return (
    <View style={styles.container}>
        <Pressable
            onPress={skipToPrevious}
        >
        <Icon style={styles.Icon} name = "skip-previous" size={40} />
        </Pressable>
        <Pressable
            onPress={()=>{
                togglePlay(state)
            }}
        >
        <Icon style={styles.Icon} name = {state === State.Playing ? 'pause' : 'play-arrow'} size={50} />
        </Pressable>
        <Pressable onPress={skipToNext}>
        <Icon style={styles.Icon} name = "skip-next" size={40} />
        </Pressable>
      <Text>ControlCentre</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginBottom : 50,
        flex :1,
        flexDirection: 'row',
        alignItems : 'center',
    },
    Icon :{
        backgroundColor : 'grey',
    },

})
