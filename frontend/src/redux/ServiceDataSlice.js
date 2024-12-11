import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    services: [],
    proposal: []
}

const ServiceDataSlice = createSlice({
    name: "serviceDataSlice",
    initialState,
    reducers : {
        resetState : (state) =>{
            
        },
        handleGetServices : (state, action) => {
            state.services = action.payload
        },
        handleGetProposal : (state, action) => {
            state.proposal = action.payload
        },
        handleAddServices : (state, action) => {
            state.services.push(action.payload)
        },
        handleAddProposal : (state, action) => {
            state.proposal.push(action.payload)
        },
        handleToggleActivePlan: (state, action) => {
            const { service, frequency } = action.payload;
        
            // Validate the payload
            if (!service || !frequency) {
                console.error("Invalid payload:", action.payload);
                return;
            }
        
            // Ensure services array exists
            if (!Array.isArray(state.services)) {
                console.error("Invalid state structure:", state);
                return;
            }
        // console.log(state.services?.map(value => value?.uniqueid === service))
            // Update the services
            state.services = state.services.map(value => {
                if (value.uniqueid === service) {
                    return { ...value, activePlan: frequency };
                }
                return value;
            });
        },
        handleAddExtraService: (state, action) => {
            const { response, proposalid } = action?.payload;
        
            // Add the new service to the services array
            if (response) {
                state.services?.push(response);
            }
        
            // Update the proposal's services array if the proposal matches the given proposalid
            state.proposal = state.proposal?.map((proposal) => {
                if (proposal.uniqueid === proposalid) {
                    return {
                        ...proposal,
                        service: [...(proposal.service || []), response?.uniqueid],
                    };
                }
                return proposal;
            });
        } ,
        handleUpdateServices: (state, action) => {
            const updatedServices = action.payload; // Array of updated service objects
        
            if (!Array.isArray(updatedServices)) {
                console.error("Payload must be an array of services.");
                return;
            }
        
            // Iterate through the updated services
            updatedServices.forEach((updatedService) => {
                const index = state.services.findIndex(
                    (service) => service.uniqueid === updatedService.uniqueid
                );
        
                if (index !== -1) {
                    // Replace the old service object with the new one
                    state.services[index] = { ...updatedService };
                } else {
                    console.warn(
                        `Service with uniqueid ${updatedService.uniqueid} not found.`
                    );
                }
            });
        },        
        handleToggleStatus: (state, action) => {
            const { status, proposalid } = action?.payload;
        
            // Find the proposal with the given proposalid
            const proposal = state?.proposal?.find((value) => value?.uniqueid === proposalid);
        
            if (proposal) {
                // If the proposal is found, update the status
                proposal.status = status ? "active" : "draft";
            }
        }
    }
})

export default ServiceDataSlice.reducer;
export const { resetState, handleAddProposal, handleToggleStatus, handleAddExtraService, handleUpdateServices, handleToggleActivePlan, handleGetProposal, handleAddServices, handleGetServices } = ServiceDataSlice.actions