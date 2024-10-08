import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import TrackPlayer, { Capability, usePlaybackState, State } from 'react-native-track-player';

const setupPlayer = async () => {
  try {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Configure the player options
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
      ],
    });
  } catch (error) {
    console.error('Error setting up player:', error);
  }
};

const AudioPlayer = () => {
  const playbackState = usePlaybackState(); // Hook to get current playback state

  useEffect(() => {
    const initializePlayer = async () => {
      await setupPlayer();
      await TrackPlayer.add({
        id: 4,
        title: 'Thousand Years',
        artist: 'Artist - Unknown',
        album: 'Christina',
        url:require('../assets/thousand-years.mp3'),
        artwork: 'https://i.ytimg.com/vi/NZGHXy1IAHM/maxresdefault.jpg', // Replace with a valid image URL
      });
    };

    initializePlayer();

    return () => {
      TrackPlayer.reset(); // Clean up the player on component unmount
    };
  }, []);

  const playPauseToggle = async () => {
    const currentState = playbackState.state;

    if (currentState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <View>
      <Button title={playbackState.state === State.Playing ? 'Pause' : 'Play'} onPress={playPauseToggle} />
    </View>
  );
};

export default AudioPlayer;
