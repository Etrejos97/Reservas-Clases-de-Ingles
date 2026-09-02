import react from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClasesScreen from "../screens/ClasesScreen";

const Stack = createNativeStackNavigator();

export default function ClasesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Clases" 
            component={ClasesScreen}
            options={{headerShown: false}} 
            />
        </Stack.Navigator>
    )
}