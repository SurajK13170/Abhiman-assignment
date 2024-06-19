import axios from "axios";
const api = axios.create({
    baseURL: 'https://abhimanbackend.onrender.com/api'
})

api.interceptors.request.use(config=>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    } 
    return config
})

export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);
export const fetchProfile = (userId) => api.get(`/profile/${userId}`);
export const createChatRoom = (roomData) => api.post('/chatrooms/create', roomData);
export const joinChatRoom = (joinData) => api.post('/chatrooms/joinRoom', joinData);
export const fetchRooms = () => api.get('/chatrooms');
export const sendFriendRequest = (requestData) => api.post('/sendRequest/:userId', requestData);
export const getprofiles = () => api.get('/profile');