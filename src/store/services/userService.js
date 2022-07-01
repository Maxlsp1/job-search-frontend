import api from "../../utils/api";

const signIn = (data) => {
    return api.post('/auth/signin', data)
}

const signUp = (data) => {
    return api.post('/auth/signup', data)
}

const googleAuth = (token) =>{
  return api.post('/auth/googleAuth', token)
}

const UserService = {
  signIn,
  signUp,
  googleAuth
};
export default UserService;