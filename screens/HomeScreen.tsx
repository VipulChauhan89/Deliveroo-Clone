import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import DeliverooLogo from "../assets/deliveroo-logo.png";
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow  from "../components/FeaturedRow";
import sanityClient from '../sanity';

type Category = {
    _id: string;
    name: string;
    short_description: string;
};

export default function HomeScreen() {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]);
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });

    },[]);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type=='featured'] {
            ...,
            restaurants[]-> {
                ...,
                dishes[]->
            }
        }`).then(data => {
            setFeaturedCategories(data);
        });
    },[]);

    return(
        <SafeAreaView>
            <View className="bg-white pt-5">
                {/* Header */}
                <View className="flex-row pb-3 items-center mx-4 space-x-2">
                    <Image source={DeliverooLogo} className="w-7 h-7 bg-gray-300 p-4 rounded-full"/>
                    <View className="flex-1">
                        <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
                        {/* TODO: Make the Header Functional Current Location */}
                        <Text className="font-bold text-xl">
                            Current Location
                            <ChevronDownIcon size={20} color="#00CCBB"/>
                        </Text>
                    </View>
                    {/* TODO: Make the UserIcon Functional */}
                    <UserIcon size={35} color="#00CCBB"/>
                </View>

                {/* Search */}
                {/* TODO: Make the Search bar functional with filter also */}
                <View className="flex-row items-center space-x-2 pb-2 mx-4">
                    <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
                        <MagnifyingGlassIcon color="grey" size={20}/>
                        <TextInput placeholder="Restaurants and Cuisines" keyboardType="default"/>
                    </View>
                    <AdjustmentsVerticalIcon color="#00CCBB"/>
                </View>
            </View>
            {/* Body */}
            <ScrollView className="bg-gray-100">
                {/* Categories */}
                <Categories/>
                {featuredCategories?.map(category => (
                    <FeaturedRow key={category._id} id={category._id} title={category.name} description={category.short_description} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}