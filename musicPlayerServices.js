import TrackPlayer, {RepeatMode, Event} from 'react-native-track-player';

import {musicList} from './src/constants';

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

export async function addTrack() {
  await TrackPlayer.add(musicList);
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}
