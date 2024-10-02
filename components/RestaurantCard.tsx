import { View, Text, TouchableOpacity, Image } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";


export default function RestaurantCard(Props:any) {
    const navigation = useNavigation<any>();
    return(
        <TouchableOpacity className="bg-white mr-3 shadow w-[256px]" onPress={() => {
            navigation.navigate('Restaurant',{Props});
        }}>
            <Image source={{uri: urlFor(Props.imageURL).url()}} className="w-64 h-36 rounded-sm"/>
            <View className="px-3 pb-4">
                <Text className="font-bold text-lg pt-2">{Props.title}</Text>
                <View className="flex-row items-center space-x-1">
                    <StarIcon color="green" opacity={0.5} size={22}/>
                    <Text className="text-xs text-gray-500"><Text className="text-green-500">{Props.rating}</Text> • {Props.genre} </Text>
                </View>
                <View className="flex-row items-center space-x-1 pr-3">
                    <MapPinIcon color="gray" opacity={0.4} size={22}/>
                    <Text className="text-xs text-gray-500" numberOfLines={1} ellipsizeMode="tail">Nearby • {Props.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}