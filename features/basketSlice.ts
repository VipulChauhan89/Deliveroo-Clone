import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ItemsState {
    items: any[];
}

const initialState: ItemsState = {
    items: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state,action:PayloadAction<any>) => {
            state.items = [...state.items,action.payload];
        },
        removeFromBasket: (state,action:PayloadAction<any>) => {
            const index = state.items.findIndex((item) => item.id === action.payload.id);
            let newBasket = [...state.items];
            if(index>=0)
            {
                newBasket.splice(index,1);
            }
            else
            {
                console.warn(`Can't remove product (id: ${action.payload.id}) as it's not in the basket.`);
            }
            state.items = newBasket;
        },

    },
})

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;
export default basketSlice.reducer;