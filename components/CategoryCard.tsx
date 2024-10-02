import { View, Text, TouchableOpacity, Image } from "react-native";
import { urlFor } from "../sanity";

export default function(Props: any) {
    return(
        <TouchableOpacity className="relative mr-2">
            <Image source={{uri: urlFor(Props.imageURL).url()}} className="h-20 w-20 rounded"/>
            <View className="absolute bottom-0 left-0 right-0 p-1 bg-gray-300 bg-opacity-50 rounded-b">
                <Text className="text-black font-bold text-center" numberOfLines={1} ellipsizeMode="tail">{Props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}