import react from 'react';
import { Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './styles';

export const MainScreen = () => {
    const { styles } = useStyles(stylesheet);

    return (
        <View style={styles.container}>
            <Text>Matui gostoso </Text>
        </View>
    );
}
