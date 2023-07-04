import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import productService from './productService';


const initialState = {
product:null,
products:[],
isError:false,
isSuccess:false,
isLoading:false,
message:""
}

const createProduct=createAsyncThunk(
    "products/create",
    async(formData,thunkAPI)=>{
        try {
            return await productService.createProduct(formData)
        } catch (error) {
            const message=(
                error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                console.log(message);
                return thunkAPI.rejectWithValue(message)

        }
    }
)




const productSlice = createSlice({
  name: second,
  initialState,
  reducers: {
    CALC_STORE_VALUE(state,action){
        console.log("store value")
    },
    extraReducers:(builder)=>{
 
    }
  }
});

export const {CALC_STORE_VALUE} = productSlice.actions

export default productSlice.reducer