import { useAuth } from "@/context/contextApi";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

export default function TabLayout(){
    const {user} = useAuth();

    if(!user){
        return <Redirect href={'/'}/>
    }

    return(
        <>
        <Tabs>
            <Tabs.Screen name="topRecipe" options={{
                title:"Top Recipes",
                headerShown:false,
                tabBarIcon:({color , size})=>{
                   return <Ionicons name="star" color={color} size={size}/>
                }
            }}/>

            <Tabs.Screen name="myRecipe" options={{
                title:"My Recipes",
                headerShown:false,
                tabBarIcon:({color , size})=>{
                   return <Ionicons name="book" color={color} size={size}/>
                }
            }}/>

            <Tabs.Screen name="userSetting" options={{
                title:"Setting",
                headerShown:false,
                tabBarIcon:({color , size})=>{
                   return <Ionicons name="settings" color={color} size={size}/>
                }
            }}/>
        </Tabs>
        </>
    )
}