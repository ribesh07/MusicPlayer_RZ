/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable semi */
import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TrackPlayer, { State , usePlaybackState  } from 'react-native-track-player'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { addTrack, setupPlayer } from '../../musicPlayerServices';


export default function ControlCentre() {
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const playBackState = usePlaybackState()
    const state = playBackState.state

    useEffect(() => {
        setupPlayer();
        addTrack();
        setIsPlayerReady(true);
        return () => {
          TrackPlayer.reset();
        };
      }, []);
    const skipToNext = async () => {
        console.log(state)
                console.log('hi next')
        await TrackPlayer.skipToNext()
    }
    const skipToPrevious = async () => {
        console.log(state)
                console.log('hi prev')
        await TrackPlayer.skipToPrevious()
    }

    const togglePlay = async (playback : State | undefined) => {
        // if (!isPlayerReady) {return;}
       try{
        const queue = await TrackPlayer.getQueue();
        const currentTrack = queue[0]
        console.log(currentTrack)
        if(currentTrack !== null){
            if(playback === State.Playing ){
                await TrackPlayer.pause()
            }else if( playback === State.Ready || playback === State.Stopped || playback === State.Paused ){
                await TrackPlayer.play()
            }
            else{
                await TrackPlayer.reset();
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
                console.log(state)
                console.log('hi')
                togglePlay(state)
            }}
        >
        <Icon style={styles.Icon} name = {state === State.Playing ? 'pause' : 'play-arrow'} size={50} />
        </Pressable>
        <Pressable onPress={skipToNext}>
        <Icon style={styles.Icon} name = "skip-next" size={40} />
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginBottom : 50,
        width : '80%',
        flex :1,
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'space-evenly',
    },
    Icon :{
        backgroundColor : 'grey',
    },

})
