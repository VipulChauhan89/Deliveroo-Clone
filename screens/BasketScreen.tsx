import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { ArrowLeftIcon, XCircleIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../sanity";
import DeliverooLogo from "../assets/deliveroo-logo.png";
import currencyFormatter from "currency-formatter";
import { removeFromBasket } from "../features/basketSlice";

export default function BasketScreen() {
    const navigation = useNavigation<any>();
    const restaurant = useSelector((state:any) => state.restaurant.restaurant);
    const items = useSelector((state:any) => state.basket.items);
    const [groupItemsInBasket,setGroupItemsInBasket] = useState<any[]>([]);
    const selectBasketTotal = useMemo(() => {
        return items.reduce((total: number, item: any) => total + item.price, 0);
    }, [items]);
    const dispatch = useDispatch();

    useMemo(() => {
        const groupedItems = items.reduce((results: any, item: any) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupItemsInBasket(groupedItems);
    }, [items]);

    // TODO: Make this basket buttons interactive
    // TODO: Add the Payment Integration Page

    return(
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-gray-100">
                <View className="p-5 border-t border-b border-[#00CCBB] bg-white shadow-sm">
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400">{restaurant.title}</Text>
                    </View>
                    <TouchableOpacity onPress={navigation.goBack} className="rounded-full bg-gray-100 absolute top-3 right-5">
                        <XCircleIcon color="#00CCBB" height={50} width={50}/>
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
                    <Image source={DeliverooLogo} className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
                    <Text className="flex-1">Deliver in 50-75 min</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00CCBB]">Change</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView className="divide-y divide-gray-200">
                    {Object.entries(groupItemsInBasket).map(([key,items]) => (
                        <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                            <Text className="text-[#00CCBB]">{items.length} x</Text>
                            <Image source={{ uri: urlFor(items[0]?.image).url()}} className="h-12 w-12 rounded-full"/>
                            <Text className="flex-1">{items[0]?.name}</Text>
                            <Text >
                                {currencyFormatter.format(items[0]?.price, { code: "INR" })}
                            </Text>
                            <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
                                <Text className="text-[#00CCBB] text-xs">Remove</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <View className="p-5 bg-white mt-5 space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">
                        {currencyFormatter.format(selectBasketTotal, { code: "INR" })}
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Delivery Fee</Text>
                        <Text className="text-gray-400">
                        {currencyFormatter.format(50, { code: "INR" })}
                        </Text>
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="font-extrabold">Order Total</Text>
                        <Text className="font-extrabold">
                        {currencyFormatter.format(selectBasketTotal+50, { code: "INR" })}
                        </Text>
                    </View>
                    <TouchableOpacity className="rounded-lg bg-[#00CCBB] p-4" onPress={() => navigation.navigate("PreparingOrder")}>
                        <Text className="text-center text-white text-lg font-bold">Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}