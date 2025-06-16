import { View } from "react-native";
import { useStyles } from "react-native-unistyles";
import { stylesheet } from "./styles";

const Separator = () => {
  const { styles } = useStyles(stylesheet);

  return <View style={styles.separator} />;
};
export default Separator;
