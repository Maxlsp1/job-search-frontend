import axios from "axios";

var env = process.env.NODE_ENV || 'development';
let url = ''
if(env === 'development'){
  url = `https://192.168.0.34:8000`
} else {
  url =  `https://projet.iut-tarbes.fr:8443`
}
export default axios.create({
  baseURL: url
});