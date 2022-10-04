import api from "services/api";
import TokenService from "services/token";

export const register = ({ username, email, password1, password2 }) => {
  return api
    .post("auth/registration/", {
      username,
      email,
      password1,
      password2,
    })
    .then((response) => {
      if (response.data.access_token) {
        let user = response.data.user;
        TokenService.updateLocalAccessToken(response.data.access_token);
        user.refresh_token = response.data.refresh_token;
        TokenService.setUser(response.data.user);
      }

      return response.data;
    });
};

export const login = ({ username, password }) => {
  return api
    .post("login/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        let user = response.data.user;
        TokenService.updateLocalAccessToken(response.data.access_token);
        user.refresh_token = response.data.refresh_token;
        TokenService.setUser(user);
      }

      return response.data;
    });
};

export const logout = () => {
  api.post("logout/");
  TokenService.removeUser();
  TokenService.updateLocalAccessToken(null);
};

export const getCurrentUser = () => {
  return api.get("profile/").then((response) => {
    const refresh_token = TokenService.getLocalRefreshToken();
    const user = response.data;
    user.refresh_token = refresh_token;
    TokenService.setUser(user);

    return response.data;
  });
};

export const verifyUserToken = (onFail) => {
  return api
    .post("token/verify/", { token: TokenService.getLocalAccessToken() })
    .catch((err) => {
      if (onFail) onFail(err);
    });
};
export const refreshUserToken = () => {
  return api
    .post("token/refresh/", {
      refresh: TokenService.getLocalRefreshToken(),
    })
    .then((response) => {
      TokenService.updateLocalAccessToken(response.data.access);
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

