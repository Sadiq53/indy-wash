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

    const formDataMultipart = new FormData();

    // Append all other fields to the FormData object
    for (const key in formData) {
        if (key === 'additionalInfo') {
            // Handle image files separately
            formData.additionalInfo.forEach((image, index) => {
                formDataMultipart.append(`additionalInfo[${index}]`, image.file);
            });
        } else if (key === 'frequency') {
            // If frequency is an object, stringify it before appending
            formDataMultipart.append(key, JSON.stringify(formData[key]));
        } else {
            formDataMultipart.append(key, formData[key]);
        }
    }
    const response = await axios.post(`${API_URL}/service/extra`, formDataMultipart, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
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
    const response = await axios.delete(`${API_URL}/service/${formData}`)
    return response.data
}

const updateCustomService = async(formData) => {
    const response = await axios.put(`${API_URL}/service/custom`, formData)
    return response.data
}


export { addCustomService, toggleActivePlan, updateCustomService, addExtraService, deleteCustomService, updateServices, deleteService }