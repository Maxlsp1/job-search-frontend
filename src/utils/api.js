import axios from "axios";

var env = process.env.NODE_ENV || 'development';
let url = ''
if(env === 'development'){
  url = `https://job-search-api.loophole.site`
} else {
  url =  `https://projet.iut-tarbes.fr:8443`
}
export default axios.create({
  baseURL: url
});