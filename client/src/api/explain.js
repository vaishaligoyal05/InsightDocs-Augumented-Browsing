import axios from 'axios';

export const explainText = async (text) => {
  const res = await axios.post('/api/explain', { text });
  return res.data.result;
};
