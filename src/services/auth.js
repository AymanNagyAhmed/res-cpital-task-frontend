import api from "@/services/api";
import store from "@/store";

export const register = ({ username, email, password1, password2 }) => {
  return api
    .post("auth/registration/", {
      name,
      email,
    password
     
    })
    .then(({data}) => {
      if (data.data.token) {
        let user = data.data;
        store.commit("token/updateLocalAccessToken",data.data.access_token);
        user.refresh_token = data.data.refresh_token;
         store.commit("token/setUser",user);
      }

      return data.data;
    });
};

export const login = ({ email, password }) => {
  return api
    .post("login/", {
      email,
      password,
    })
    .then(({data}) => {
      
      if (data.data.token) {
        store.commit("token/updateLocalAccessToken",data.data.token);
        store.commit("token/setUser",data.data);
      }

      return data;
    });
};

export const logout = () => {
  api.post("logout/");
  store.commit("token/removeUser");
  store.commit("token/updateLocalAccessToken",null);
};

export const getCurrentUser = () => {
  return api.get("profile/").then((data) => {
    const refresh_token =  store.getters["token/getLocalRefreshToken"];
    const user = data.data;
    user.refresh_token = refresh_token;
    store.modules.token.mutations.setUser(user);

    return data.data;
  });
};

export const verifyUserToken = (onFail) => {
  return api
    .post("token/verify/", { token:  store.getters["token/getLocalAccessToken"] })
    .catch((err) => {
      if (onFail) onFail(err);
    });
};
export const refreshUserToken = () => {
  return api
    .post("token/refresh/", {
      refresh:  store.getters["token/getLocalRefreshToken"],
    })
    .then((data) => {
       store.commit("token/updateLocalAccessToken",data.data.access);
    });
};
export const updateUser = (user) => {
  return api.patch("profile/", user);
};
export const deactivateUser = (user) => {
  return api.patch("profile/", { is_active: false }).then(() => logout());
};
export const updatePassword = (new_passwords) => {
  return api.post("profile/", new_passwords);
};

