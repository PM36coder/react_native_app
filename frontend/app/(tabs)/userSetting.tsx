import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useAuth } from "@/context/contextApi";
import {  useRouter } from "expo-router";
export default function UserSetting(){

    const {logout} = useAuth()

     const router = useRouter();
    const handleLogout=()=>{
        logout()
        router.push('/')
    }
    return (<>
    <SafeAreaView style={{flex:1}}>
    <View style={{flex:1, alignItems:'center' ,justifyContent:'center'}}>
        <Text>My Setting</Text>
        <Pressable onPress={handleLogout}>
            <Text style={{fontSize:20}}>Logout</Text>
        </Pressable>

    </View>
    </SafeAreaView>
    </>)
}