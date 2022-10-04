import api from "@/services/api";

export const getAll = async (signal) => {
  return api.get("ad-campaigns/", { signal }).then(({ data }) => data);
};

export const get = async (id, signal) => {
  return api.get(`ad-campaigns/${id}/`, { signal }).then(({ data }) => data);
};
export const create = async (formData, signal) => {
  return api
    .post("ad-campaigns/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal,
    })
    .then(({ data }) => data);
};
export const search = async(search, signal) => {
  return api
    .get(`ad-campaigns/?search=${search}`, { signal })
    .then(({ data }) => data);
};
export const remove = async(id, signal) => {
  return api.delete(`ad-campaigns/${id}/`, { signal });
};
export const update =  async(id, formData, signal) => {
  return api
    .patch(`ad-campaigns/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal,
    })
    .then(({ data }) => data);
};
const AdCampaigns = { get, getAll, remove, update, create, search,};
export default AdCampaigns;
