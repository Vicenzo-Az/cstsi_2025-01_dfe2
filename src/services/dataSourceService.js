import api from './api';

export const fetchDataSources = async () => {
  const response = await api.get('/data-sources/');
  return response.data;
};

export const createDataSource = async (data) => {
  const response = await api.post('/data-sources/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteDataSource = async (id) => {
  await api.delete(`/data-sources/${id}/`);
};