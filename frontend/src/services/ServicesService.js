import axios from 'axios'
import { API_URL } from '../utils/API_URL'


const addCustomService = async(formData) => {
    const response = await axios.post(`${API_URL}/service/custom`, formData)
    return response.data
}

const toggleActivePlan = async(formData) => {
    const response = await axios.put(`${API_URL}/service/plan`, formData)
    return response.data
}

const addExtraService = async(formData) => {
    const response = await axios.post(`${API_URL}/service/extra`, formData)
    return response.data
}

const updateServices = async(formData) => {
    const response = await axios.put(`${API_URL}/service`, formData)
    return response.data
} 

const deleteService = async(formData) => {
    const response = await axios.post(`${API_URL}/service/delete`, formData)
    return response.data
}

const deleteCustomService = async(formData) => {
    const response = await axios.post(`${API_URL}/service/${formData}`)
    return response.data
}


export { addCustomService, toggleActivePlan, addExtraService, deleteCustomService, updateServices, deleteService }