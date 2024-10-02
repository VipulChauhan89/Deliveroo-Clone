import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import currencyFormatter from "currency-formatter";
import { useMemo } from "react";

export default function BasketIcon() {
    const items = useSelector((state:any) => state.basket.items);
    const restaurant = useSelector((state:any) => state.restaurant.restaurant);
    const navigation = useNavigation<any>();
    const filteredItems = useMemo(() => {
        return items.filter((item: any) => item.restaurantId===restaurant.id);
    }, [restaurant,items]);

    const selectBasketTotal = useMemo(() => {
        return filteredItems.reduce((total: number, item: any) => total + item.price, 0);
    }, [restaurant,items]);

    if(filteredItems.length===0)
    {
        return null;
    }
    
    return(
        <View className="absolute bottom-10 w-full z-50">
            <TouchableOpacity className="bg-[#00CCBB] flex-row space-x-2 mx-5 p-4 rounded-lg items-center" onPress={() => navigation.navigate("Basket")}>
                <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">{filteredItems.length}</Text>
                <Text className="flex-1 text-white font-extrabold text-lg text-center">View Basket</Text>
                <Text className="text-lg text-white font-extrabold">{currencyFormatter.format(selectBasketTotal, { code: "INR" })}</Text>
            </TouchableOpacity>
        </View>
    );
}