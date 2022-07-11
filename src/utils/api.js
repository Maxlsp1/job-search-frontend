import axios from "axios";

var env = process.env.NODE_ENV || 'development';
let url = ''
if(env === 'development'){
  url = 'http://localhost:8000'
} else {
  url =  `https://some-url-in-443-port`
}
export default axios.create({
  baseURL: url
});