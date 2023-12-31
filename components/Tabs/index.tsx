import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MyContext } from "../../Global/Context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../../screens/Home";
import OrderView from "../../screens/Orders";
import Favorites from "../../screens/Favorites";
import Settings from "../../screens/Settings";
import MessageView from "../../screens/MessageView";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    const { theme, setTheme } = useContext(MyContext);
  
    const header = {
      backgroundColor: theme === "Light" ? "#fff" : "#363636",
    };
    const headerTitle = {
      color: theme === "Light" ? "#363636" : "#f4f4f4",
    };
  
    const tabStyle = {
      backgroundColor: theme === "Dark" ? "#282828" : "#fff",
      borderTopColor: "grey",
      borderTopWidth: 0,
    };
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === "home") {
              iconName = focused ? "home-outline" : "home-outline";
            } else if (route.name === "orders") {
              iconName = focused ? "list-outline" : "list-outline";
            } else if (route.name === "favorites") {
              iconName = focused ? "heart-outline" : "heart-outline";
            } else if (route.name === "settings") {
              iconName = focused ? "settings-outline" : "settings-outline";
            }
  
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: theme === "Light" ? "#FFF" : "#282828",
          tabBarInactiveTintColor: theme === "Light" ? "#282828" : "#fff",
          tabBarStyle: tabStyle,
          freezeOnBlur: true,
          tabBarActiveBackgroundColor: theme === "Light" ? "#363636" : "#fff",
          tabBarItemStyle: styles.tabItem,
          tabBarShowLabel: true,
          
        })}
      >
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            title: "Citações",
            headerShown: true,
            headerStyle: header,
            headerTitleStyle: headerTitle,
          }}
        />
        <Tab.Screen
          name="orders"
          component={OrderView}
          options={{
            title: "Categorias",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="favorites"
          component={Favorites}
          options={{
            title: "Favoritos",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="settings"
          component={Settings}
          options={{
            title: "Configurações",
            headerShown: true,
            headerStyle: header,
            headerTitleStyle: headerTitle,
          }}
        />
        {/* <Tab.Screen name="teste" component={MessageView} options={{
              title: 'Teste',
              headerShown: false
  
            }} /> */}
      </Tab.Navigator>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
      margin: 0,
    },
  
    tab: {
      backgroundColor: "#282828",
      borderTopColor: "#424242",
      borderTopWidth: 0.5,
      // borderRadius: 32
    },
    headerTab: {
      backgroundColor: "#282828",
    },
    headerTitleStyle: {
      color: "#fff",
    },
    tabItem: {
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      // borderRadius: 8,
      // borderRadius: 25
    },
  });