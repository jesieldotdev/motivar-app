import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  Pressable,
  Image,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
  Share,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";
import * as S from "./style";
import { MyContext } from "../../Global/Context";

const MotiCard = (props: any) => {
  function updateMessage() {
    setAuthor(Math.floor(Math.random() * mainAuthors.length - 1));
    return;
  }

  const { getItem, setItem } = useAsyncStorage("@messages:favorites");

  const [fav, setFav] = useState(false);

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const phrase = props.data;

  const list = [];

  phrase?.frases?.map((frase) => {
    // console.log(frase.texto)
    list.push({
      autor: frase.autor,
      texto: frase.texto,
    });
  });

  let rand = Math.floor(Math.random() * (list.length - 1));

  const frase = list[rand];

  async function copyToClipboard() {
    // Clipboard.setString('hello world')
    await Clipboard.setStringAsync(frase.texto);

    showToast("Mensagem copiada!");
  }

  async function handleLikePress() {
    const response = await getItem();
    const previousData = response ? JSON.parse(response) : [];
    const filt = previousData.filter((item) => item.texto === frase.texto);

    const data = [...previousData, frase];

    // setFav(!fav);
    if (filt.length < 1) {
      setFav(true)
      await setItem(JSON.stringify(data));
      // await AsyncStorage.setItem('@messages:favorites', JSON.stringify(frase))
      showToast("Adicionado aos favoritos!");
    }else{
      setFav(true)
    }
  }

  async function send() {
    try {
      const result = await Share.share({
        message: `${frase.texto} - ${frase.autor}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  // async function IsLike() {
  //   const response = await getItem();
  //   const previousData = response ? JSON.parse(response) : [];
  //   const filt = previousData.filter((item) => item.texto === frase.texto);
  //   console.log(filt);
  //   if (filt.length < 0) {
  //     return setFav(true)
  //   } else {
  //     setFav(false)
  //   }
  // }

  // useEffect(()=> {
  //   IsLike()
  //   console.log(fav)

  // }, [IsLike, fav])

  const dataSource = [
    {
      label: "Like",
      icon: fav ? "heart" : "heart-outline",
      callback: handleLikePress,
    },
    {
      label: "Send",
      icon: "share-outline",
      callback: send,
    },
    {
      label: "Copy",
      icon: "copy-outline",
      callback: copyToClipboard,
    },
    {
      label: "Update",
      icon: "ios-refresh-outline",
      callback: props.update,
    },
  ];

  // const random = Math.floor(Math.random() * phrase.frases.length)

  const [selected, setSelected] = useState(false);

  // console.log(props.erro)

  const { theme } = useContext(MyContext);

  return (
    <View style={styles.Card}>
      {!props.erro ? (
        <>
          {frase ? (
            <S.Message theme={theme} selectable={true}>
              {frase.texto}
            </S.Message>
          ) : (
            <ActivityIndicator
              color={theme === "Dark" ? "#ffffff" : "#000"}
              style={styles.loading}
            />
          )}

          <S.Author>
            {frase
              ? frase?.autor
              : frase?.texto && frase?.texto === "Undefined"
              ? "Desconhecido"
              : null}
          </S.Author>
          <Text style={styles.Text}>{fav}</Text>

          {frase ? (
            <S.ActionsGroup theme={theme}>
              {dataSource.map((item, index) => (
                <TouchableOpacity
                  onPress={(e) => (item.callback ? item.callback() : null)}
                  key={index}
                >
                  <Text style={styles.btnText}>
                    <Ionicons
                      name={item.icon}
                      size={32}
                      color={theme === "Dark" ? "white" : "black"}
                    />
                  </Text>
                </TouchableOpacity>
              ))}

              {/* <TouchableOpacity
                    onPress={() => setSelected(!selected)}
                    style={{ backgroundColor: selected ? "#eee" : "transparent" }}
                >
                    <Text>Press me</Text>
                </TouchableOpacity> */}
            </S.ActionsGroup>
          ) : null}
        </>
      ) : (
        <>
          <Text style={styles.Text}>Sem conexão</Text>
          <Text
            style={{
              fontSize: 16,
              color: "#eee",
              marginTop: "8px",
            }}
          >
            Algumas funções podem não funcionar
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    margin: 32,
  },
  Text: {
    fontSize: 22,
    color: "#dbd9d9",
    fontWeight: "600",
    maxHeight: 400,
    textAlign: "left",
  },
  author: {
    fontSize: 16,
    color: "#808080",
    fontWeight: "600",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "auto",
    marginLeft: "auto",
  },
  btnText: {
    padding: 16,
  },

  loading: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default MotiCard;
