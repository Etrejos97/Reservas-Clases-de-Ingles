import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import LabelLevel from "./LabelLevel";




export default Card({clase, onPress, ancho}){
    return (
        <Pressable
            onPress={onPress}>
            <Image source={{ uri: "URL_TO_IMAGE" }} style={} resizeMode="cover"/>

        </Pressable>
    )
}