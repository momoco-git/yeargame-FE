import { api } from './instance';

export const gameAPI = {
  getContents: () => api.get('/content/item'),
  getAnimal: () => api.get('/content/animal'),
  getCommand: () => api.get('/content/command'),
  getWord: () => api.get('/content/word'),
  getMemory: () => api.get('/content/memory'),
  getZuminout: () => api.get('/content/zuminout'),
  getBody: () => api.get('/content/body'),
};
