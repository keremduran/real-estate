import axios from 'axios';
import cache from 'memory-cache';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const cachedData = cache.get(url);
  if (cachedData) {
    return cachedData;
  }

  const { data } = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': 'ca2ead922cmsh79dd6c1a31a0182p16e81ajsnce18c3968ecc',
    },
  });

  const hours = 24;
  cache.put(url, data, hours * 1000 * 60 * 60);
  return data;
};
