import { View, Text, ScrollView } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import sanityClient from "../sanity";

type Restaurants = {
    _id: string;
    image: string;
    name: string;
    rating: number;
    type?: {
        name: string;
    };
    address: string;
    short_description: string;
    dishes: string[];
    long: number;
    lat: number;
};

export default function FeaturedRow(Props:any) {
    const [restaurants,setRestaurants] = useState<Restaurants[]>([]);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type=='featured' && _id==$id] {
            ...,
            restaurants[]-> {
                ...,
                dishes[]->,
                type-> {
                    name
                }
            },
        }[0]`,{id:Props.id}).then(data => {
            setRestaurants(data?.restaurants);
        });
    },[]);

    return(
        <View>
            <View className="mt-4 flex-row items-center justify-between px-4">
                <Text className="font-bold text-lg">{Props.title}</Text>
                <ArrowRightIcon color="#00CCBB"/>
            </View>
            <Text className="text-xs text-gray-500 px-4">{Props.description}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15,}} className="pt-4">
                {/* RestaurantCards */}
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} id={restaurant._id} imageURL={restaurant.image} title={restaurant.name} rating={restaurant.rating} genre={restaurant.type?.name} address={restaurant.address} shortDescription={restaurant.short_description} dishes={restaurant.dishes} long={restaurant.long} lat={restaurant.lat}/>
                ))}
            </ScrollView>
        </View>
    );
}