import { configureStore } from '@reduxjs/toolkit'

import AviaSlice from './AviaSlice'

export const store = configureStore({
  reducer: {
    AviaSlice,
  },
})

export default store
