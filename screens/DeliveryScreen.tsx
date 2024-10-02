import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import * as Animatable from "react-native-animatable";
import DeliverooRider from "../assets/deliverooRider.gif";
import DeliverooLogo from "../assets/deliveroo-logo.png";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

export default function DeliveryScreen() {
    const navigation = useNavigation<any>();
    const restaurant = useSelector((state:any) => state.restaurant.restaurant);

    // TODO: Make buttons interactive
    
    return(
        <View className="bg-[#00CCBB] flex-1">
            <SafeAreaView className="z-50">
                <View className="flex-row justify-between items-center p-5">
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <XMarkIcon color="white" size={30}/>
                    </TouchableOpacity>
                    <Text className="font-light text-white text-lg">Order Help</Text>
                </View>
                <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-lg">
                    <View className="flex-row justify-between">
                        <View>
                            <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                            <Text className="text-4xl font-bold">40-45 Minutes</Text>
                        </View>
                        <Animatable.Image source={DeliverooRider} iterationCount={1} className="h-20 w-20"/>
                    </View>
                    <Progress.Bar height={10} width={200} color="#00CCBB" indeterminate={true}/>
                    <Text className="mt-3 text-gray-500">Your order at {restaurant.title} is being prepared.</Text>
                </View>
            </SafeAreaView>
            <MapView initialRegion={{latitude: restaurant.lat, longitude: restaurant.long, latitudeDelta: 0.005, longitudeDelta: 0.005,}} className="flex-1 -mt-20 z-0" mapType="mutedStandard">
                <Marker coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }} title={restaurant.title} description={restaurant.shortDescription} identifier="origin" pinColor="#00CCBB"></Marker>
            </MapView>
            <SafeAreaView className="bg-white h-28">
                <View className="-mt-10 flex-row items-center space-x-5">
                    <Image source={DeliverooLogo} className="h-12 w-12 bg-gray-300 rounded-full ml-5"/>
                    <View className="flex-1">
                        <Text className="text-lg">Vipul Chauhan</Text>
                        <Text className="text-gray-400">Your Rider</Text>
                    </View>
                    <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}