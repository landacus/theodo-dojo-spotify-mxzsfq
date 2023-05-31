const apiToken: string =
  'BQDIJq_AKP9YiqD7oyBAPMukKkIbXrd5MRq7FrUekpNM0PLnRlOZiXYZHNPYKW1H9wSzAz90p_Yb5TUas7tPhxnhbBIHTp9fzObu9nmm3YIdi24RT4s';

export const fetchTracks = async () => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: unknown[] };

  return data.items;
};
