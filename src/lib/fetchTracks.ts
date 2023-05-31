import { SavedTrack, Track } from 'spotify-types';

const apiToken =
  'BQBJTnNw0KB4gGUl5mWrYDrdSeDX3ZBUKWUT1tZlnYoHh4uPyVsAHLfNhRDbVJ-xIKRL392GPA-19uvzL8MKU44a_vPfUVALXN1Jq6srRdAodYVldzn16rziuantsqGViKwFV__9gTD8zNREB-Hy_8zZ-trLHtdbxjEGD-xG2zADVRkWwD50P5wLZSi151po9Pz8levsJ7gJnTAZYakafSY_XVXrF3YIEIaX5VKsl_-cTNYlQz4Vy6swhJLrN5rgJrJ46tAZ_4Jrqd--jMhn64nfQyWTHpMgeTAHB5KK-n_agF1frltSYr26l3tYL9VYY7-SFg';

export const fetchTracks = async (): Promise<SavedTrack[]> => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: SavedTrack[] };

  return data.items;
};

export async function getAccessToken(
  clientId: string,
  code: string,
): Promise<string> {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:3000');
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}
