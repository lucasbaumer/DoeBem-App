import { Input } from "@/components/atoms/Input";
import React from "react";
import { View, Text } from "react-native";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "./styles";

import MainLogo from "@/assets/images/main-logo.svg";

export default function SignInScreen() {
    const { styles } = useStyles(stylesheet);

    return (
        <View style={styles.container}>
            <MainLogo width={80} height={80}/>
            <View style={styles.formContainer}>
                <Text>Entrar</Text>
                <Input label="Email" />
                <Input label="Password" secureTextEntry />
            </View>
        </View>
    
    )
}