import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Restaurant {
    key: string;
    id: string;
    imageURL: string;
    title: string;
    rating: number;
    genre: string;
    address: string;
    shortDescription: string;
    dishes: any[];
    long: number;
    lat: number;
}

export interface RestaurantState {
    restaurant: Restaurant;
}

const initialState: RestaurantState = {
    restaurant: {
        key: "",
        id: "",
        imageURL: '',
        title: '',
        rating: 0,
        genre: '',
        address: '',
        shortDescription: '',
        dishes: [],
        long: 0,
        lat: 0,
    }
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurant: (state,action:PayloadAction<Restaurant>) => {
            state.restaurant=action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;