import { View, Text, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import OrderLoading from "../assets/orderLoding.gif";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function PreparingOrderScreen() {
    const navigation = useNavigation<any>();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Delivery");
        },4000)
    },[])
    return(
        <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
            <Animatable.Image source={OrderLoading} animation="slideInUp" iterationCount={1} className="h-96 w-96"/>
            <Animatable.Text animation="slideInUp" iterationCount={1} className="text-lg text-white font-bold text-center mb-10">Waiting for Restaurant to accept your order!</Animatable.Text>
            <Progress.Circle size={60} indeterminate={true} color="white"/>
        </SafeAreaView>
    );
}