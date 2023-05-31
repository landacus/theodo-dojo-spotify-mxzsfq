import { SavedTrack, Track } from 'spotify-types';

const apiToken =
  'BQBJkWnvpmsZO0hyBp9DWv2lkz0kyT3NuY-dJMbv87L99XhmVFt-k96Fnfrlns5_Zo6xI1d4-7g-HaUOnzhlupNAuM-P0_q3_GAwbD0XVzbNDXV7GK1y0DnAZwUSygigrJrLPL1sTo6hAf6cNc1j2QNUodi8uP1s2t60KMddAa78pp-eRfyV8vDIIdKN2HgVMZ3FbpGoNYAnvY9hBC3oXnIM-LordyJ7HJWHRpgmOEe6DdhER6ohdmUBisUDYp2r9WM3cQ1AitMnjS3ecbd3cADRXD5sfIoAPls3Hxp3tWDfclOqcPTHOwMX_m7JcECYy0nqgg';

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
