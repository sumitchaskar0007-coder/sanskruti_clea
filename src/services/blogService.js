import axios from "axios";

const API = "https://api.sanskrutitechnoschool.com/api/blogs";

export const getBlogs = () => axios.get(API);

export const getBlog = (slug) =>
    axios.get(`${API}/${slug}`);

export const createBlog = (data) =>
    axios.post(API, data);

export const updateBlog = (id, data) =>
    axios.put(`${API}/${id}`, data);

export const deleteBlog = (id) =>
    axios.delete(`${API}/${id}`);