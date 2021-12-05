import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': 'ca2ead922cmsh79dd6c1a31a0182p16e81ajsnce18c3968ecc',
    },
  });
  return data;
};
