import RN from "../RN";
import { COLORS } from "../../constants/colors";
import Item from "./Item";

export default () => (
  <RN.View style={styles.container}>
    <Item />
    <Item />
  </RN.View>
);

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
});
