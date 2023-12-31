import { StatusBar } from "expo-status-bar";
import { Pressable, TouchableOpacity } from "react-native";
import { useEffect, useState, useContext } from "react";
import { FlatGrid } from "react-native-super-grid";
import { SimpleGrid } from "react-native-super-grid";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MotiCard from "../../components/MotiCard";
import MsgView from "../../components/MsgView";
import { MsgProps } from "../../App";
import {
  styles,
  Container,
  AuthorItem,
} from "./style";
import { OrderViewController } from "./viewController";
import { MyContext } from "../../Global/Context";
import { ContextProps } from "../../Global/Context";

const Stack = createNativeStackNavigator();

interface CustomProps {
  theme: string;
}

const Orders = ({ navigation }: any) => {
  interface OrdersType {
    label: string;
    name: string;
    icon: string;
    data?: MsgProps;
  }

  const { theme } = useContext<any>(MyContext);
  const { mainAuthors, GetMessageByAuthor, message, messageAuthor } =
    OrderViewController();
  const { author, setAuthor } = useContext<any>(MyContext);

  // getMessageByAuthor()

  // useEffect(()=> (
  //   console.log(getMessageByAuthor('Stevie Jobs'))
  // ))

  function handlePress(author: string) {
    // ToastAndroid.show(item, ToastAndroid.SHORT)
    setAuthor(author);

    // GetMessageByAuthor("Jesus Cristo");

    // console.log(messageAuthor, author);
    navigation.navigate("order", {
      title: author,
      messages: message,
      type: "author",
      data: {
        autor: author,
        texto: message,
      },
    });
  }

  return (
    <Container theme={theme}>
      <FlatGrid
        style={styles.grid}
        itemDimension={100}
        data={mainAuthors}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity onPress={() => handlePress(item.authName)}>
              <AuthorItem theme={theme} key={index}>
                {item.authName}
              </AuthorItem>
            </TouchableOpacity>
          </>
        )}
      />

      <StatusBar style="auto" />
    </Container>
  );
};

export default function OrderView() {
  const { author, setAuthor } = useContext<any>(MyContext);
  const { theme } = useContext<any>(MyContext);

  const header = {
    backgroundColor: theme === "Light" ? "#fff" : "#363636",
  };

  const headerTitle = {
    color: theme === "Light" ? "#363636" : "#f4f4f4",
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: "#fff",
          headerTitleStyle: styles.headerTitle,
        }}
      >
        <Stack.Screen
          name="main"
          component={Orders}
          options={{
            title: "Categorias",
            headerShown: true,
            headerStyle: header,
            headerTitleStyle: headerTitle,
          }}
        />
        <Stack.Screen
          name="order"
          component={MsgView}
          options={{
            title: author,
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
