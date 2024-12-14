import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    manageSidebar: false,
    customers: [],
    admin: {}
}

const AdminDataSlice = createSlice({
    name: "adminDataSlice",
    initialState,
    reducers : {
        resetState : (state) =>{
            
        },
        handleAddCustomerDetail : (state, action) => {
            state.customers.push(action.payload)
        },
        handleSidebar : (state, action) => {
            state.manageSidebar = action.payload
        },
        handleGetCustomer : (state, action) => {
            // console.log(action.payload)
            state.customers = action.payload
        },
        handleGetAdmin : (state, action) => {
            // console.log(action.payload)
            state.admin = action.payload
        },
        handleUpdateCustomerProperty: (state, action) => {
            const { customerid, propertyid, proposalid, serviceid } = action.payload;
        
            // Return a new customers array with updated customer properties
            state.customers = state.customers?.map(customer => {
                if (customer.uniqueid === customerid) {
                    // Find the property inside the customer
                    const updatedProperty = customer.property?.map(property => {
                        if (property.uniqueid === propertyid) {
                            // Ensure services and proposals arrays exist before pushing values
                            const updatedServices = property.services || [];
                            const updatedProposals = property.proposals || [];
        
                            // Push the new serviceid and proposalid if they are provided
                            if (serviceid && !updatedServices.includes(serviceid)) {
                                updatedServices.push(serviceid);
                            }
                            if (proposalid && !updatedProposals.includes(proposalid)) {
                                updatedProposals.push(proposalid);
                            }
        
                            return {
                                ...property,  // Copy the existing property
                                services: updatedServices,
                                proposals: updatedProposals
                            };
                        }
                        return property;  // Return the unchanged property
                    });
        
                    // Return the updated customer object with the updated property
                    return {
                        ...customer,  // Copy the existing customer object
                        property: updatedProperty
                    };
                }
                return customer;  // Return the unchanged customer
            });
        },
        handleAddCustomService : (state, action) => {
            state.admin?.customServices?.push(action.payload)
        },
        handleAddService: (state, action) => {
            const { customerid, propertyid, serviceid } = action.payload;
        
            // Find the index of the customer in the state
            const customerIndex = state.customers?.findIndex(cust => cust.uniqueid === customerid);
        
            if (customerIndex !== -1) {
                const customer = state.customers[customerIndex];
        
                // Find the index of the property in the customer's properties
                const propertyIndex = customer.property?.findIndex(prop => prop.uniqueid === propertyid);
        
                if (propertyIndex !== -1) {
                    // Update the property services immutably
                    const updatedProperties = customer.property.map((prop, index) =>
                        index === propertyIndex
                            ? {
                                ...prop,
                                services: [...(prop.services || []), serviceid]
                            }
                            : prop
                    );
        
                    // Update the customer immutably
                    const updatedCustomers = state.customers.map((cust, index) =>
                        index === customerIndex
                            ? {
                                ...cust,
                                property: updatedProperties
                            }
                            : cust
                    );
        
                    // Return the updated state
                    state.customers = updatedCustomers;
                }
            }
        },
        handleDeleteServiceFromCustomer: (state, action) => {
            const { serviceid, customerid, propertyid } = action.payload;
        
            // Find the customer by `customerid`
            state.customers = state.customers?.map((customer) => {
                if (customer.uniqueid === customerid) {
                    return {
                        ...customer,
                        property: customer.property?.map((property) => {
                            if (property.uniqueid === propertyid) {
                                return {
                                    ...property,
                                    services: property.services?.filter((service) => service !== serviceid),
                                };
                            }
                            return property;
                        }),
                    };
                }
                return customer;
            });
        },
        handleDeleteCustomer: (state, action) => {
            const { payload } = action;
            state.customers = state.customers?.filter(value => value.uniqueid !== payload);
        },
        handleDeleteCustomService: (state, action) => {
            const { payload } = action;
            state.admin.customServices = state.admin.customServices?.filter(
                (value) => value.uniqueid !== payload
            );
        }                
    }
})

export default AdminDataSlice.reducer;
export const { resetState, handleAddCustomerDetail, handleDeleteCustomer, handleDeleteCustomService, handleDeleteServiceFromCustomer, handleAddService, handleAddCustomService, handleGetAdmin,handleUpdateCustomerProperty, handleSidebar, handleGetCustomer } = AdminDataSlice.actions