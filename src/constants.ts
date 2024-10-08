import { Track } from 'react-native-track-player';

export const musicList = {
    Bamlehri : require('./assets/bamlehri.mp3'),
    dandelions : require('./assets/dandelions.mp3'),
    ruthdandelions : require('./assets/ruth-dandelions.mp3'),
    thousandYear : require('./assets/thousand-years.mp3'),
};

export const listData: Track [] = [
    {
        id: 1,
        title: 'Dandelions',
        artist: 'Artist - Unknown',
        album: 'Ruth',
        url: musicList.dandelions,
        artwork: 'https://i.ytimg.com/vi/taYxyE34jjY/maxresdefault.jpg',
    },
    {
        id: 2,
        title: 'Bamlehri',
        artist: 'Artist - Unknown',
        album: 'Shiva',
        url: musicList.Bamlehri,
        artwork: 'https://i1.sndcdn.com/artworks-6Bh4Fe9f9HpNcMgu-8zR6Ag-t500x500.jpg',
    },
    {
        id: 3,
        title: 'Ruth Dandelions',
        artist: 'Artist - Unknown',
        album: 'Ruth',
        url: musicList.ruthdandelions,
        artwork: 'https://i.ytimg.com/vi/WgTMeICssXY/sddefault.jpg',
    },
    {
        id: 4,
        title: 'Thousand Years',
        artist: 'Artist - Unknown',
        album: 'Christina',
        url: musicList.thousandYear,
        artwork: 'https://i.ytimg.com/vi/NZGHXy1IAHM/maxresdefault.jpg',
    },
];
