import axios from 'axios';

const API_URL = 'https://68783ee131d28a460e1da728.mockapi.io/games';

export const getGames = () => axios.get(API_URL);
export const getGameById = (id) => axios.get(`${API_URL}/${id}`);
export const createGame = (game) => axios.post(API_URL, game);
export const updateGame = (id, game) => axios.put(`${API_URL}/${id}`, game);
export const deleteGame = (id) => axios.delete(`${API_URL}/${id}`);