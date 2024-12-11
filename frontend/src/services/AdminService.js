import axios from 'axios'
import { API_URL } from '../utils/API_URL'

const getAdmin = async() => {
    const response = await axios.get(`${API_URL}/admin`)
    return response.data
}



export { getAdmin }