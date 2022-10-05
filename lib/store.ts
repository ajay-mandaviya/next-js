import { createStore, action } from "easy-peasy";
export const store = createStore({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  chaneActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});
