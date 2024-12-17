import axios from 'axios'
import { API_URL } from '../utils/API_URL'


const addProposal = async(formData) => {
    const response = await axios.post(`${API_URL}/service`, formData)
    return response.data
}

const getServiceAndProposal = async() => {
    const response = await axios.get(`${API_URL}/service`)
    return response.data
}

const toggleStatus = async(formData) => {
    const response = await axios.put(`${API_URL}/service/status`, formData)
    return response.data
}

const deleteProposal = async(formData) => {
    const response = await axios.post(`${API_URL}/service/proposal/delete`, formData)
    return response.data
}

export { addProposal, getServiceAndProposal, toggleStatus, deleteProposal }