import axios from 'axios';
import { baseUrl } from '../constants/url';


const Userinstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
})

export default Userinstance;