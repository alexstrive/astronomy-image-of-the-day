import Constants from 'expo-constants';

export function getAPOD(date) {
  const API_KEY = Constants.expoConfig.extra.apiKey;

  if (!API_KEY) {
    return [];
  }

  const formattedURL = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;

  return fetch(formattedURL).then((response) => response.json());
}
