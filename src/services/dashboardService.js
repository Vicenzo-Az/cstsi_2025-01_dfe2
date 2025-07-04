// src/services/dashboardService.js
import api from './api';

export const fetchDashboardSummary = async () => {
  const res = await api.get('dashboard/');
  return res.data;
};

export const createDashboard = async (payload) => {
  const res = await api.post('dashboards/', payload);
  return res.data;
};

export const updateDashboard = async (id, payload) => {
  const res = await api.put(`dashboards/${id}/`, payload);
  return res.data;
};

export const deleteDashboard = async (id) => {
  await api.delete(`dashboards/${id}/`);
};
