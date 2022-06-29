import api from "../../utils/api";

const signIn = (data) => {
    return api.post('/auth/signin', data)
}

const signUp = (data) => {
    console.log(data)
    return api.post('/auth/signup', data)
}

const UserService = {
  signIn,
  signUp
};
export default UserService;