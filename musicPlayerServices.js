import TrackPlayer, {
  Capability,
  RepeatMode,
  Event,
} from 'react-native-track-player';

import {listData} from './src/constants';

export async function playBackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
}

export const setupPlayer = async () => {
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

export async function addTrack() {
  await TrackPlayer.add(listData);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}
