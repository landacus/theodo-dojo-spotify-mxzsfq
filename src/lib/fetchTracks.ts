const apiToken: string =
  'BQAuNZeTAc56UwsHCaWsG_AAM6gIX_63p-rpFAFyGXUVcOBhQDoa1lA7DHYpQcuJ6_7iDjiAdiV-6_sKY-CwI2gFcbAz5nfgtC92NWPoEfIG68p-Tj0';

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
