import api from "services/api";

export const getAll = (signal) => {
  return api.get("ad-campaigns/", { signal }).then(({ data }) => data);
};

export const get = (id, signal) => {
  return api.get(`ad-campaigns/${id}/`, { signal }).then(({ data }) => data);
};
export const create = (formData, signal) => {
  return api
    .post("ad-campaigns/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal,
    })
    .then(({ data }) => data);
};
export const search = (search, signal) => {
  return api
    .get(`ad-campaigns/?search=${search}`, { signal })
    .then(({ data }) => data);
};
export const remove = (id, signal) => {
  return api.delete(`ad-campaigns/${id}/`, { signal });
};
export const update = (id, formData, signal) => {
  return api
    .patch(`ad-campaigns/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal,
    })
    .then(({ data }) => data);
};
const Pins = { get, getAll, remove, update, create, search, getOwn };
export default Pins;
