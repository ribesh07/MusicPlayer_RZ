/* eslint-disable react-native/no-inline-styles */
/* eslint-disable semi */
import {  Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Track } from 'react-native-track-player'
import SongSlider from '../components/SongSlider'
import ControlCentre from '../components/ControlCentre'
import Songs from '../components/Songs'
import { listData } from '../constants'


const {width} = Dimensions.get('window')
// console.log(listData)


export default function MusicPlay() {
    const [trackdata , setTrack] = useState < Track | null>()

      useEffect(() => {
        if (trackdata) {
          console.log('Updated track data:', trackdata);
          setTrack(trackdata)
        }
      }, [trackdata]);

    return (
    <View style={styles.container}>
      <FlatList
      horizontal
      data={listData}
      renderItem={({item})=>(
        //   render
        <>
                <View style={styles.list}>
                    <View style={styles.albumContainer}>
                        {item.artwork &&
                            <>
                                <Image source={{uri: item.artwork?.toString()}} style={styles.albumImg} />
                                <Text style={{fontSize:20,textAlign:'center'}}>{item.title}</Text>
                            </>
                        }
                    </View>
                </View>
            </>
      )}
      keyExtractor={(item) => item.id.toString()}
      />
      <Songs track={trackdata} />
      <SongSlider />
      <ControlCentre />
    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        flex :1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'lightblue',
    },
    list : {
        width : width,
        justifyContent : 'center',
        alignItems : 'center',
    },
    albumContainer : {
        width : 300,
        height : 300,
    },
    albumImg : {
        height : '100%',
        borderRadius : 5,
    },
})
