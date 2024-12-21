import axios from 'axios'
import { API_URL } from '../utils/API_URL'


const addProposal = async (formData) => {

    console.log(formData)
    try {
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

        // Make the request using axios
        const response = await axios.post(`${API_URL}/service`, formDataMultipart, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error adding proposal:', error);
        throw error;
    }
};

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