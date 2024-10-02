import { View, Text, ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import Sushi from "../assets/sushi.jpg";
import { useEffect, useState } from "react";
import sanityClient from "../sanity";

type Category = {
    _id: string;
    image: string;
    name: string;
}

export default function Categories() {
    const [categories,setCategories] = useState<Category[]>([]);

    useEffect(() => {
        sanityClient.fetch(`*[_type=='category']`).then(data => {
            setCategories(data);
        });
    },[]);

    // TODO: Make the Categories functional
    return(
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:15, paddingTop:10,}}>
            {/* CategoryCard */}
            {categories.map(category => (
                <CategoryCard key={category._id} imageURL={category.image} title={category.name}/>
            ))}
        </ScrollView>
    );
}