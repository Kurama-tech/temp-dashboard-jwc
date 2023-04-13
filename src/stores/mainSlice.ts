import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, UserPayloadObject } from '../interfaces'

interface MainState {
  userName: string
  userEmail: null | string
  userAvatar: null | string
  products: []
  disabled: []
  editProduct: Product
  isFieldFocusRegistered: boolean
}

const initialState: MainState = {
  /* User */
  userName: '',
  userEmail: null,
  userAvatar: null,

  products: [],
  disabled: [],
  editProduct: {
    id: '',
    name: '',
    tables: [],
    status: '',
    description: '',
    images: []
  },

  /* Field focus with ctrl+k (to register only once) */
  isFieldFocusRegistered: false,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userName = action.payload.name
      state.userEmail = action.payload.email
      state.userAvatar = action.payload.avatar
    },
    setProducts: (state, action: PayloadAction<any>) => {
      state.products = action.payload
    },
    setDisabledProducts: (state, action: PayloadAction<any>) => {
      state.disabled = action.payload
    },
    setEditProduct: (state, action: PayloadAction<Product>) => {
      state.editProduct = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setProducts, setEditProduct, setDisabledProducts } = mainSlice.actions

export default mainSlice.reducer
