import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { urlFor } from "../sanity";
import { ArrowLeftIcon, StarIcon } from "react-native-heroicons/solid";
import { ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

type Dish = {
    _id: string;
    name: string;
    short_description: string;
    price: number;
    image: string; 
}

type RestaurantScreenRouteParams = {
    Props: {
        key: string;
        id: string;
        imageURL: string;
        title: string;
        rating: number;
        genre: string;
        address: string;
        shortDescription: string;
        dishes: Dish[];
        long: number;
        lat: number;
    };
};

type RootStackParamList = {
    Restaurant: RestaurantScreenRouteParams;
};



export default function RestaurantScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'Restaurant'>>();
    const { Props } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    },[]);

    useEffect(() => {
        dispatch(setRestaurant(Props));
    },[])

    const memoizedDishes = useMemo(() => Props.dishes, [Props.dishes]);
    
    return(
        <View>
            <ScrollView>
                <View className="relative">
                    <Image source={{ uri: urlFor(Props.imageURL).url() }} className="w-full h-56 bg-gray-300 p-4"/>
                    <TouchableOpacity className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full" onPress={navigation.goBack}>
                        <ArrowLeftIcon size={20} color="#00CCBB"/>
                    </TouchableOpacity>
                </View>
                <View className="bg-white">
                    <View className="px-4 pt-4">
                        <Text className="text-3xl font-bold">{Props.title}</Text>
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <StarIcon color="green" opacity={0.5} size={22}/>
                                <Text className="text-xs text-gray-500"><Text className="text-green-500">{Props.rating}</Text> • {Props.genre} </Text>
                            </View>
                            <View className="flex-row items-center space-x-1 flex-1">
                                <MapPinIcon color="gray" opacity={0.4} size={22}/>
                                <Text className="text-xs text-gray-500 flex-shrink">{Props.address} </Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 mt-2 pb-4">{Props.shortDescription}</Text>
                    </View>
                    {/* TODO: Make this Have a food Allergy Functional */}
                    <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                        <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20}/>
                        <Text className="pl-2 flex-1 text-md font-bold">Have a food allergy?</Text>
                        <ChevronRightIcon color="#00CCBB"/>
                    </TouchableOpacity>
                </View>
                <View className="pb-36">
                    <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
                    {/* Dish rows */}
                    {memoizedDishes.map(dish => (
                        <DishRow key={dish._id} id={dish._id} name={dish.name} description={dish.short_description} price={dish.price} image={dish.image} restaurantId={Props.id}/>
                    ))}
                </View>
            </ScrollView>
            <BasketIcon/>
        </View>
    );
}