/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
  useActiveTrack,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { listData } from '../constants';

const {width} = Dimensions.get('window');

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    await TrackPlayer.add(listData);
  } catch (error) {
    console.log('Error setting up player:', error);
  }
};

const AudioPlayer2 = () => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const activeTrack = useActiveTrack();
  const [isPlayerReady, setIsPlayerReady] = useState(false);


  useEffect(() => {

  },[]);

  useEffect(() => {
    setupPlayer();
    setIsPlayerReady(true);
    return () => {
      TrackPlayer.reset();
    };
  }, [isPlayerReady]);

  const togglePlayback = async (playState : State | undefined) => {
    if (!isPlayerReady) {return;}
    if (playState === State.Playing) {
      await TrackPlayer.pause();
    } else if (playState === State.Paused || playState === State.Ready) {
      await TrackPlayer.play();
    } else {
      // If no track is loaded or player is in another state
      await TrackPlayer.reset();
      await TrackPlayer.add(listData);
      await TrackPlayer.play();
    }
  };

  const skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
    } catch (error) {
      console.log('Error skipping to previous:', error);
    }
  };
  
  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log('Error skipping to next:', error);
    }
  };

  if (!isPlayerReady) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
            <Image source={{uri: listData[0].artwork?.toString()}} style={{height : 100,width:100}} />
            <Text style={styles.title}>{activeTrack?.title || listData[0].title}</Text>
            <Text style={styles.artist}>{activeTrack?.artist || listData[0].artist}</Text>
            
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={skipToPrevious} style={styles.controlButton}>
            <Icon name="skip-previous" size={32} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePlayback(playbackState.state)}>
          <Icon 
            name={playbackState.state === State.Playing ? 'pause' : 'play-arrow'} 
            size={48}
            color="#444"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNext} style={styles.controlButton}>
            <Icon name="skip-next" size={32} color="#444" />
        </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {new Date(progress.position * 1000).toISOString().substring(15, 19)}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(progress.position / progress.duration) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {new Date(progress.duration * 1000).toISOString().substring(15, 19)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  controls: {
    flexDirection: 'column',
    marginBottom: 40,
    alignItems : 'center',
    justifyContent : 'center',
  },
  controlButton: {
    marginHorizontal: 20,
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#333',
  },
  progressText: {
    color: '#666',
    fontSize: 14,
  },
  list : {
    width : width,
    justifyContent : 'center',
    alignSelf : 'center',
},
albumContainer : {
    alignSelf : 'center',
    justifyContent : 'center',
    width : 300,
    height : 300,
},
albumImg : {
    height : '100%',
    borderRadius : 5,
},
});

export default AudioPlayer2;
