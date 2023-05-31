import logo from './assets/logo.svg';
import './App.css';
import { fetchTracks } from './lib/fetchTracks.ts';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SavedTrack } from 'spotify-types';
import swal from 'sweetalert';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomize(tab) {
  var i, j, tmp;
  for (i = tab.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    tmp = tab[i];
    tab[i] = tab[j];
    tab[j] = tmp;
  }
  return tab;
}

const App = () => {
  const trackUrls = [
    'https://p.scdn.co/mp3-preview/742294f35af9390e799dd96c633788410a332e52',
    'https://p.scdn.co/mp3-preview/5a12483aa3b51331aba663131dbac967ccb33d99',
    'https://p.scdn.co/mp3-preview/31f65b6a613010f22316c7be335b62226cf2f263',
    'https://p.scdn.co/mp3-preview/0f6b8a3524ec410020457da4cdd7717f9addce2f',
    'https://p.scdn.co/mp3-preview/ac28d1b0be285ed3bfd8e9fa5fad133776d7cf36',
  ];

  const { data: tracks }: { data: SavedTrack[] | undefined } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });
  let n = 0;
  if (tracks) {
    n = tracks.length;
  }
  if (tracks == undefined) {
    const tracks = [];
  }
  const [trackIndex, setTrackIndex] = useState(getRandomInt(n));
  let proposals = [trackIndex, getRandomInt(n), getRandomInt(n)];
  proposals = randomize(proposals);
  console.log(proposals);
  const goToNextTrack = () => {
    setTrackIndex(getRandomInt(n));
  };

  const checkAnswer = (rep: boolean) => {
    if (rep) {
      swal('Bravo', 'Bonne réponse', 'success');
    } else {
      swal('Dommage', 'Mauvaise réponse', 'error');
    }
  };

  const getImgUrl = (track: SavedTrack | undefined) => {
    const src = track?.track?.album.images[0]?.url; // A changer ;)
    return src;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le blind test</h1>
      </header>
      <div className="App-images">
        {tracks && <p>{tracks[trackIndex]?.track.name}</p>}

        {tracks && (
          <img src={getImgUrl(tracks[trackIndex])} width="300px" alt="" />
        )}
      </div>
      <div className="App-buttons">
        {tracks && (
          <audio
            src={tracks[trackIndex]?.track.preview_url}
            autoPlay
            controls
          />
        )}
        <button onClick={goToNextTrack}>Next track</button>
        for (var i = 0; i < proposals.length; i++) {
          {tracks && tracks[i] && (
            <button
              onClick={() =>
                checkAnswer(
                  tracks[trackIndex]?.track.id == tracks[i]?.track.id,
                )
              }
            >
              {' '}
              {tracks[trackIndex]?.track.name}{' '}
            </button>
          )}
        }
        {tracks && tracks[trackIndex + 1] && (
          <button
            onClick={() =>
              checkAnswer(
                tracks[trackIndex + 1]?.track.id ==
                  tracks[trackIndex]?.track.id,
              )
            }
          >
            {' '}
            {tracks[trackIndex + 1]?.track.name}{' '}
          </button>
        )}
        {tracks && tracks[trackIndex + 2] && (
          <button
            onClick={() =>
              checkAnswer(
                tracks[trackIndex + 2]?.track.id ==
                  tracks[trackIndex]?.track.id,
              )
            }
          >
            {' '}
            {tracks[trackIndex + 2]?.track.name}{' '}
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
