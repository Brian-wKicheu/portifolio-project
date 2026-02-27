import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const portfolioAPI = {
    // profile
    getProfile: () => api.get('/profile/main/').then((response) => response.data),

    // Skills
    getSkills: () => api.get('/skills/'),
    getSkillsByCategory: (category) => api.get(`/skills/?category=${category}`),

    // Projects
    getProjects: () => api.get('/projects/'),
    getFeaturedProjects: () => api.get('/projects/?featured=true'),

    //Experience
    getExperience: () => api.get('/experience/'),

    // Contact
    sendMessage: (data) => api.post('/contact/', data),
};

export default portfolioAPI;



