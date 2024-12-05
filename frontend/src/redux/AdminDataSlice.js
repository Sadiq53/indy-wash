import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    manageSidebar: false,
    addingCustomerDetail: []
}

const AdminDataSlice = createSlice({
    name: "adminDataSlice",
    initialState,
    reducers : {
        resetState : (state) =>{
            
        },
        handleAddCustomerDetail : (state, action) => {
            state.addingCustomerDetail = action.payload
        },
        handleSidebar : (state, action) => {
            state.manageSidebar = action.payload
        }
    }
})

export default AdminDataSlice.reducer;
export const { resetState, handleAddCustomerDetail, handleSidebar } = AdminDataSlice.actions