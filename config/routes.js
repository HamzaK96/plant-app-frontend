import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Cam from "../screens/Cam";
import Pred from "../screens/Pred";

export default createAppContainer(
  createStackNavigator({
    home: {
      screen: Cam,
      path: "login/:user",
      navigationOptions: ({ navigation }) => ({
        title: "Plant Doctor",
        headerStyle: {
          backgroundColor: "#469B40",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          alignSelf: "center",
          textAlign: "center",
          flex: 1,
        },
      }),
    },

    pred: {
      screen: Pred,
    },
  })
);
