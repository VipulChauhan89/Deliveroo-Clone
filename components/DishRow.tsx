import { View, Text, TouchableOpacity, Image } from "react-native";
import  currencyFormatter  from "currency-formatter";
import { urlFor } from "../sanity";
import { useEffect, useMemo, useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket } from "../features/basketSlice";

export default function DishRow(Props:any) {
    
    const [isPressed,setIsPressed] = useState<boolean>(false);
    const restaurant = useSelector((state:any) => state.restaurant.restaurant);
    const items = useSelector((state: any) => state.basket.items);
    const dispatch = useDispatch();

    const filteredItems = items.filter((item: any) => (item.id === Props.id && item.restaurantId === restaurant.id));

    const addItemToBasket = () => {
        dispatch(addToBasket(Props));
    };

    const removeItemFromBasket = () => {
        if(filteredItems.length == 0)
        {
            return;
        }
        dispatch(removeFromBasket(Props));
    };

    return(
        <View>
            <TouchableOpacity className={`bg-white border border-gray-200 p-4 ${isPressed && "border-b-0"}`} onPress={() => setIsPressed(!isPressed)}>
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1">{Props.name}</Text>
                        <Text className="text-gray-400">{Props.description}</Text>
                        <Text className="text-gray-400 mt-2">
                            {currencyFormatter.format(Props.price, { code: "INR" })}
                        </Text>
                    </View>
                    <View>
                        <Image source={{ uri: urlFor(Props.image).url()}} className="h-20 w-20 bg-gray-300 p-4 border border-gray-400"/>
                    </View>
                </View>
            </TouchableOpacity>
            {isPressed && (
                <View className="bg-white px-4">
                    <View className="flex-row space-x-2 items-center">
                        <TouchableOpacity disabled={filteredItems.length==0} onPress={removeItemFromBasket}>
                            <MinusCircleIcon color={filteredItems.length>0?"#00CCBB":"gray"} size={40}/>
                        </TouchableOpacity>
                        <Text>{filteredItems.length}</Text>
                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon color={"#00CCBB"} size={40}/>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}