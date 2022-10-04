

const state = {
  access_token: null,
  user: JSON.parse(localStorage.getItem("user")),
};
const mutations = {
  updateLocalAccessToken(state, token) {
    state.access_token = token;
  },
  setUser(state, user) {
    localStorage.setItem("user", JSON.stringify(user));
  },
  removeUser(state) {
    localStorage.removeItem("user");
  },
};
const getters = {
  getLocalAccessToken(state) {
    return state.access_token;
  },
  getUser(state) {
    return JSON.parse(localStorage.getItem("user"));
  },
  getLocalRefreshToken(state) {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refresh_token;
  },
};

const TokenStore = {
  state,
  mutations,
  getters,
};
export default TokenStore;
