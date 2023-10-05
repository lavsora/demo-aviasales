import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import uniqid from 'uniqid'

import AviaService from '../service/Service'

const initialState = {
  filters: [
    { id: 0, text: 'Все', checked: true },
    { id: 1, text: 'Без пересадок', checked: true, transfers: 0 },
    { id: 2, text: '1 пересадка', checked: true, transfers: 1 },
    { id: 3, text: '2 пересадки', checked: true, transfers: 2 },
    { id: 4, text: '3 пересадки', checked: true, transfers: 3 },
  ],
  buttons: [
    { id: 0, text: 'САМЫЙ ДЕШЕВЫЙ', disabled: false, active: false },
    { id: 1, text: 'САМЫЙ БЫСТРЫЙ', disabled: false, active: false },
  ],
  status: null,
  error: null,
  tickets: [],
  stop: false,
  sortedByPrice: false,
  sortedBySpeed: false,
  count: 5,
}

export const fetchAvia = createAsyncThunk(
  'aviaSales/fetchAvia',
  async (_, { rejectWithValue }) => {
    try {
      const body = await AviaService()
      return body
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

export const AviaSlice = createSlice({
  name: 'aviaSales',
  initialState,
  reducers: {
    checkboxConfig: (state, action) => {
      const checkboxId = action.payload

      const allChecked = state.filters.every((filter) => filter.checked)

      if (checkboxId === 0) {
        state.filters = state.filters.map((el) => ({
          ...el,
          checked: !allChecked,
        }))
      }

      const updatedFilters = state.filters.map((el) =>
        el.id === checkboxId ? { ...el, checked: !el.checked } : el,
      )

      const allFiltersChecked = updatedFilters
        .slice(1)
        .every((filter) => filter.checked)

      state.filters = updatedFilters.map((el) =>
        el.id === 0 ? { ...el, checked: allFiltersChecked } : el,
      )
    },

    buttonConfig: (state, action) => {
      const buttonId = action.payload

      state.buttons.forEach((button, index) => {
        button.active = index === buttonId
      })

      if (buttonId === 0) {
        state.sortedByPrice = true
        state.sortedBySpeed = false
        state.tickets.sort((a, b) => a.price - b.price)
      } else if (buttonId === 1) {
        state.sortedByPrice = false
        state.sortedBySpeed = true
        state.tickets.sort(
          (a, b) => a.segments[0].duration - b.segments[0].duration,
        )
      }
    },
    showTickets: (state) => {
      state.count += 5
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvia.pending, (state) => {
        state.status = true
        state.error = null
      })
      .addCase(fetchAvia.fulfilled, (state, action) => {
        state.status = true
        const newTickets = action.payload.tickets.map((ticket) => ({
          id: uniqid(),
          ...ticket,
        }))
        state.tickets.unshift(...newTickets)

        if (!action.payload.stop) {
          state.stop = !state.stop
        } else {
          state.status = false
        }

        if (state.sortedByPrice) {
          state.tickets.sort((a, b) => a.price - b.price)
        }
        if (state.sortedBySpeed) {
          state.tickets.sort(
            (a, b) => a.segments[0].duration - b.segments[0].duration,
          )
        }
      })
      .addCase(fetchAvia.rejected, (state, action) => {
        if (action.payload.status === 500) {
          state.status = true
        }
        state.error = action.payload
        state.stop = !state.stop
      })
  },
})

export const { checkboxConfig, buttonConfig, showTickets } = AviaSlice.actions

export default AviaSlice.reducer