import { useState, useRef, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Alert,
  Platform,
  View,
  Text,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Appearance,
  ImageBackground,
  useColorScheme,
  Modal,
  RefreshControl,
  StatusBar,
  DrawerLayoutAndroid,
  DrawerActions,
  Dimensions,
  useWindowDimensions,
  SafeAreaView,
  Linking,
} from "react-native";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Audio } from "expo-av";
const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";
const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
  buttonList: { flex: 1, justifyContent: "center" },
  button: {
    margin: 10,
    backgroundColor: "#c0392b",
    borderRadius: 3,
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});
const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>This is home screen</Text>
      <Button
        title="Go  to help section"
        onPress={() => {
          navigation.navigate("Help");
        }}
      ></Button>
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
};
const HelpScreen = ({ navigation }) => {
  const state = {
    links: [
      {
        title: "Smashing Magazine",
        url: "https://www.smashingmagazine.com/articles/",
      },
      {
        title: "CSS Tricks",
        url: "https://css-tricks.com/",
      },
      {
        title: "Gitconnected Blog",
        url: "https://medium.com/gitconnected",
      },
      {
        title: "Hacker News",
        url: "https://news.ycombinator.com/",
      },
    ],
  };
  return (
    <View>
      <View>
        <Button title="help me"></Button>
        <Button
          title="Go  to Home"
          onPress={() => {
            navigation.navigate("Home");
          }}
        ></Button>
        <Button
          title="Redirect to help itself"
          onPress={() => {
            navigation.navigate("Help");
          }}
        ></Button>
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
      </View>
      <View>
        <View style={styles.buttonList}>
          {state.links.map(({ title, url }, i) => {
            return <LinkButton key={i} LinkText={title} ActLink={url} />;
          })}
        </View>
        <View>
          {console.log(Linking.getInitialURL())}
          <Button
            title={"open Email"}
            onPress={() => {
              Linking.openURL("mailto: support@expo.io");
            }}
          ></Button>
          <Button
            title={"open Telephone"}
            onPress={() => {
              Linking.openURL("tel:+123456789");
            }}
          ></Button>
          <Button
            title={"open SMS"}
            onPress={() => {
              Linking.openURL("sms:+123456789");
            }}
          ></Button>
          <Button
            title={"open Website"}
            onPress={() => {
              Linking.openURL("https://www.youtube.com/");
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
};
const ImageScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    DeliciousHandrawn: require("./assets/fonts/DeliciousHandrawn-Regular.ttf"),
  });
  let colorscheme = useColorScheme();
  const image = {
    uri: "https://docs.expo.dev/static/images/tutorial/splash.png",
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const drawer = useRef(null);
  const onRefresh = () => {
    Alert.alert("refreshing");
  };
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );
  return (
    <View>
      {colorscheme === "dark" ? (
        <Text style={{ fontFamily: "DeliciousHandrawn" }}>Dark mode</Text>
      ) : (
        <Text>Light mode</Text>
      )}
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.text}>Elements</Text>
        <Text style={styles.text}>in Front of</Text>
        <Text style={styles.text}>Background</Text>
      </ImageBackground>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>Header</Text>
            <TextInput placeholder="Username" style={styles.textInput} />
            <View style={styles.btnContainer}>
              <TextInput placeholder="Username" style={styles.textInput} />
              <Button title="Submit" onPress={() => null} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <DrawerLayoutAndroid
        drawerBackgroundColor="rgba(0,0,0,0.5)"
        drawerPosition="right"
        drawerWidth={300}
        onDrawerClose={() => {
          Alert.alert("drawer closed");
        }}
        ref={drawer}
        renderNavigationView={navigationView}
      >
        <View>
          <Text>Bonjour</Text>
        </View>
      </DrawerLayoutAndroid>
      <Modal
        animationType="fade"
        onDismiss={() => {
          console.log("thx");
        }}
        onRequestClose={() => {
          console.log("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Scrolllz</Text>
      </ScrollView>
    </View>
  );
};
const TopScreen = ({ navigation }) => {
  const simpPress = () => {
    Alert.alert("You tapped the button!");
  };

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("https://api.randomuser.me/?results=20");
  //     const dat = res.json();
  //     console.log(dat);
  //   })();
  // }, []);
  const { width, height } = useWindowDimensions();
  return (
    <View>
      <Button
        title="Go  to help section"
        onPress={() => {
          navigation.navigate("Help");
        }}
      ></Button>
      <Button
        title="Go  to Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      ></Button>
      <Button
        title="Reach Imgur"
        onPress={() => {
          navigation.navigate("Imgur");
        }}
      ></Button>
      <View style={styles.container}>
        <TouchableHighlight onPress={simpPress} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableHighlight</Text>
          </View>
        </TouchableHighlight>
        <TouchableOpacity activeOpacity={0}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableOpacity</Text>
          </View>
        </TouchableOpacity>
        <TouchableNativeFeedback
          onPress={() => {
            console.log("only on Mobile with a feedback");
          }}
          background={
            Platform.OS === "android"
              ? TouchableNativeFeedback.SelectableBackground()
              : undefined
          }
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              TouchableNativeFeedback{" "}
              {Platform.OS !== "android" ? "(Android only)" : ""}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("only on Mobile without a feedback");
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
          </View>
        </TouchableWithoutFeedback>
        <Button
          title="Alert"
          style={styles.button}
          onPress={() => {
            Alert.alert("Click me senpai");
          }}
        ></Button>
        <Button
          title="Prompt"
          style={styles.button}
          onPress={() => {
            Alert.prompt();
          }}
        ></Button>
      </View>
      <View></View>
    </View>
  );
};
const LinkButton = ({ LinkText, ActLink, indexNo }) => {
  return (
    <Button
      key={indexNo}
      title={LinkText}
      onPress={() => {
        Linking.openURL(ActLink).catch((err) => {
          console.error("Failed opening page because: ", err);
          alert("Failed to open page");
        });
      }}
    />
  );
};
const RenderPlayslist = ({ playlist }) => {
  return (
    <View style={{ flex: 1, height: "100%", width: "100%" }}>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Text style={{ color: "white", fontSize: 34, fontWeight: "600" }}>
            {playlist[0].title}
          </Text>
          <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }}>
            {playlist[0].artist}
          </Text>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "300" }}>
            {playlist[0].album}
          </Text>
        </View>
      </View>
    </View>
  );
};
const PlayGround = () => {
  const styles = StyleSheet.create({
    panel: {
      backgroundColor: "#fff",
      borderRadius: 3,
      padding: 10,
      marginBottom: 20,
    },
    instructions: {
      color: "#bbb",
      fontSize: 16,
      marginTop: 15,
      marginBottom: 10,
    },
    textfield: { height: 40, marginBottom: 10 },
    button: {
      backgroundColor: "#34495e",
      borderRadius: 3,
      padding: 12,
      flex: 1,
    },
    buttonText: {
      textAlign: "center",
      color: "#fff",
      fontSize: 16,
    },
    main: {
      flex: 1,
      backgroundColor: "#ecf0f1",
    },
    toolbar: {
      backgroundColor: "#1abc9c",
      padding: 20,
      color: "#fff",
      fontSize: 20,
    },
  });
  const initialState = {
    name: "",
    phoneNumber: "",
    emailID: "",
  };
  const [formData, setformData] = useState(initialState);
  const handleChange = (name, value) => {
    setformData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Alert.alert(`${Object.keys(formData)}-${Object.values(formData)}`);
  };
  return (
    <SafeAreaView style={styles.main}>
      <View>
        <Text style={styles.toolbar}>Fitness App</Text>
      </View>
      <View style={styles.panel}>
        <View>
          <Text style={styles.instructions}>
            {" "}
            Please enter your contact information
          </Text>
          <TextInput
            style={styles.textfield}
            autoCapitalize="words"
            placeholder={"your name"}
            name="name"
            autoComplete="name"
            value={formData.name}
            enterKeyHint="next"
            inputMode="text"
            keyboardType="default"
            onChangeText={(value) => handleChange("name", value)}
            placeholderTextColor={"#A9A9AC"}
          ></TextInput>
          <TextInput
            style={styles.textfield}
            name="phoneNumber"
            autoCapitalize="none"
            autoComplete="tel"
            value={formData.phoneNumber}
            enterKeyHint="next"
            inputMode="tel"
            keyboardType="number-pad"
            maxLength={12}
            onChangeText={(value) => handleChange("phoneNumber", value)}
            placeholder={"your phone number"}
            placeholderTextColor={"#A9A9AC"}
          ></TextInput>
          <TextInput
            style={styles.textfield}
            name="emailID"
            autoCapitalize="none"
            autoComplete="email"
            value={formData.emailID}
            inputMode="email"
            keyboardType="email-address"
            enterKeyHint="done"
            onChangeText={(value) => handleChange("emailID", value)}
            placeholder={"your email address"}
            placeholderTextColor={"#A9A9AC"}
            onSubmitEditing={handleSubmit}
          ></TextInput>
          <TouchableHighlight style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Saves</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};
const Permissionz = ({ navigation }) => {
  // async function askCameraPermission() {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   if (status === "granted") {
  //     console.log("grant gustin");
  //   } else {
  //     console.log("mark");
  //   }
  // }
  // const [location, setLocation] = useState();
  // useEffect(() => {
  //   const getLocation = async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status === "granted") {
  //       let loc = await Location.getCurrentPositionAsync();
  //       setLocation(loc);
  //       console.log(loc);
  //     } else {
  //       Alert.alert("Please turn on the location");
  //       setLocation("no location");
  //     }
  //   };
  //   getLocation();
  // }, []);

  const playlist = [
    {
      title: "People Watching",
      artist: "Keller Williams",
      album: "Keller Williams Live at The Westcott Theater on 2012-09-22",
      uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      title: "Hunted By A Freak",
      artist: "Mogwai",
      album: "Mogwai Live at Ancienne Belgique on 2017-1020",
      uri: "https://ia601509.us.archive.org/17/items/mogwai201710-20.brussels.fm/Mogwai2017-10-20Brussels-07.mp3",
    },
    {
      title: "Nervous Tic Motion of the Head to the Left",
      artist: "Andrew Bird",
      album: "Andrew Bird Live at Rio Theater on 2011-0128",
      uri: "https://ia800503.us.archive.org/8/items/andrewbird2011 -01-28.early.dr7.flac16/andrewbird2011-0128.early.t07.mp3",
    },
  ];

  const [track, setTrack] = useState(null);
  const [isPlaying, setisPlaying] = useState(true);
  const [isError, setIsError] = useState(false);
  console.log(track);
  console.log(isPlaying);
  console.log(isError);
  // const initialState = {
  //   currIndex: 0,
  //   currTrack: null,
  //   buffering: true,
  //   isPlaying: false,
  //   isError: false,
  //   volume: 2.0,
  // };
  // const [track, setTrack] = useState(null);
  // const [sound, setSound] = useState(initialState);
  // const soundObject = new Audio.Sound();
  // useEffect(() => {
  //   const playSound = async () => {
  //     try {
  //       const { track } = await Audio.Sound.createAsync(
  //         {
  //           uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  //         },
  //         { shouldPlay: true }
  //       );
  //       setTrack(track);
  //       setSound((prev) => ({
  //         ...prev,
  //         currTrack: "url",
  //         buffering: false,
  //         isPlaying: true,
  //         isError: false,
  //       }));
  //     } catch (err) {
  //       setSound((prev) => ({
  //         ...prev,
  //         isError: true,
  //         buffering: true,
  //       }));
  //       console.log(`audio playing failed ${err}`);
  //     }
  //   };
  //   playSound();
  // }, []);

  useEffect(() => {
    const playSound = async () => {
      try {
        const { track } = await Audio.Sound.createAsync({
          uri: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
        });
        setTrack(track);
        setisPlaying(true);
        setIsError(false);
      } catch (err) {
        console.log("unable to play music :" + err);
        setIsError(true);
      }
    };
    playSound();
  }, []);
  const styles = StyleSheet.create({
    control: { margin: 20 },
    controls: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  const handlePause = async () => {
    try {
      await Audio.Sound.pauseAsync();
      setisPlaying(false);
      console.log("audio paused");
    } catch {
      console.log("error audio cannot be paused");
    }
  };
  const handlePlay = async () => {
    try {
      await Audio.Sound.playAsync();
      setisPlaying(true);
      console.log("audio playing");
    } catch {
      console.log("Unable to play");
    }
  };
  return (
    <View>
      {isError ? (
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
            width: "100%",
            height: "100%",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            color: "#fff",
          }}
        >
          <ImageBackground
            style={{ flex: 1, height: "100%", width: "100%" }}
            source={{ uri: "https://picsum.photos/id/412/915/2220?blur=9" }}
          >
            <RenderPlayslist playlist={playlist} />
            <View style={styles.controls}>
              <TouchableOpacity style={styles.control}>
                <Feather name="skip-back" size={32} color="#fff" />
              </TouchableOpacity>
              {isPlaying ? (
                <TouchableOpacity style={styles.control} onPress={handlePause}>
                  <Feather name="pause" size={32} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.control} onPress={handlePlay}>
                  <Feather name="play" size={32} color="#fff" />
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.control}>
                <Feather name="skip-forward" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          {/* {location ? (
        <MapView
          style={{ height: "100%", width: "100%" }}
          initialRegion={{
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            style={{ height: "2%", width: "2%" }}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            image={require("./assets/loc.png")}
          />
        </MapView>
      ) : (
        <Text>Loading Location Data</Text>
      )} */}
          {/* <View>
        <Text>Permissions tab</Text>
        <Button
          title="Request Camera Permissions"
          onPress={askCameraPermission}
        />
        <Button title="Request Location Permission" onPress={getLocation} />
      </View> */}
        </View>
      )}
    </View>
  );
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function App() {
  const [isReady, setIsReady] = useState(__DEV__ ? false : true);
  const [initialState, setInitialState] = useState();
  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== "web" && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <StatusBar animated={true} backgroundColor={"#06b1fa"} hidden={true} />
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen
          name="TopScreen"
          component={TopScreen}
          options={{
            title: "The router",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
            },
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "The home",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              textAlign: "center",
            },
          }}
        />
        <Tab.Screen name="Help" component={HelpScreen} />
        <Tab.Screen name="Imgur" component={ImageScreen} />
        <Tab.Screen
          name="Forms"
          component={PlayGround}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Permission"
          component={Permissionz}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;
