import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
  useProgress,
  useActiveTrack,
} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { listData } from '../constants';


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
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    await TrackPlayer.add(listData);
  } catch (error) {
    console.log('Error setting up player:', error);
  }
};

const AudioPlayer3 = () => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const activeTrack = useActiveTrack();
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    setupPlayer();
    setIsPlayerReady(true);
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  useEffect(() => {
    if (!isSeeking && progress.position && progress.duration) {
      setSliderValue(progress.position);
    }
  }, [progress, isSeeking]);

  const togglePlayback = async (playState : State | undefined) => {
    if (!isPlayerReady) {return;}

    if (playState === State.Playing) {
      await TrackPlayer.pause();
    } else if (playState === State.Paused || playState === State.Ready) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.skip(listData[0].id);
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

  const slidingStarted = () => {
    setIsSeeking(true);
  };

  const slidingCompleted = async (value : number) => {
    await TrackPlayer.seekTo(value);
    setSliderValue(value);
    setIsSeeking(false);
  };

  const formatTime = (seconds :number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
      <Text style={styles.title}>{activeTrack?.title || 'No Track Selected'}</Text>
      <Text style={styles.artist}>{activeTrack?.artist || ''}</Text>

      <View style={styles.controls}>
        <TouchableOpacity onPress={skipToPrevious} style={styles.controlButton}>
          <Icon name="skip-previous" size={32} color="#444" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => togglePlayback(playbackState.state)}
          style={[styles.controlButton, styles.playButton]}
        >
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

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {formatTime(progress.position)}
        </Text>
        <Slider
          style={styles.progressBar}
          value={sliderValue}
          minimumValue={0}
          maximumValue={progress.duration}
          minimumTrackTintColor="#333"
          maximumTrackTintColor="#eee"
          thumbTintColor="#333"
          onSlidingStart={slidingStarted}
          onSlidingComplete={slidingCompleted}
        />
        <Text style={styles.progressText}>
          {formatTime(progress.duration)}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  controlButton: {
    marginHorizontal: 20,
  },
  playButton: {
    marginHorizontal: 40,
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  progressText: {
    color: '#666',
    fontSize: 14,
    minWidth: 40,
  },
});

export default AudioPlayer3;
