import { api } from './instance';

export const gameAPI = {
  getContents: () => api.get('/content/item'),
};
