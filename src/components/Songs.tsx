/* eslint-disable semi */
import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { Track } from 'react-native-track-player'

type SongProps = PropsWithChildren<{
    track : Track | null | undefined
}>

export default function Songs({track} : SongProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>
            {track?.title}
        </Text>
        <Text style={styles.artist}>
            {track?.artist}   .  {track?.album}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'baseline',
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name:{
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  artist:{
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
})
