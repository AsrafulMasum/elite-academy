import axios from 'axios';

const baseAxios = axios.create({
    
    baseURL: "http://103.161.9.43:3000",
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  export default baseAxios;