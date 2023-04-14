import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import { AuthContext } from "../provider/AuthProvider";
import Constants from "expo-constants";

//Utility Screens
import Loading from "../screens/utils/Loading";

//General Screens
import Home from "../screens/Home";
import ProfileEdit from "../screens/ProfileEdit";
import Profile from "../screens/Profile";
import Exercise from "../screens/Exercise";
import ExerciseArea from "../screens/ExerciseArea";
import DietPlan from "../screens/DietPlan";
import Premium from "../screens/Premium";
import BuyPremium from "../screens/BuyPremium";
import NewWorkout from "../screens/NewWorkout";
import NewWorkoutArea from "../screens/NewWorkoutArea";
import EndWorkout from "../screens/EndWorkout";
import ChatScreen from "../screens/ChatScreen";
import Logs from "../screens/Logs";

// Auth screens
import Login from "../screens/auth/Login";
import Welcome from "../screens/auth/Welcome";
import Details from "../screens/auth/Details";
import Areas from "../screens/auth/Areas";
import Type from "../screens/auth/Type";
import Register from "../screens/auth/Register";
import ForgotPassword from "../screens/auth/ForgotPassword";

const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
  measurementId: Constants.manifest.extra.measurementId,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="Details" component={Details} />
      <AuthStack.Screen name="Type" component={Type} />
      <AuthStack.Screen name="Areas" component={Areas} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Exercise" component={Exercise} />
      <MainStack.Screen name="ExerciseArea" component={ExerciseArea} />
      <MainStack.Screen name="DietPlan" component={DietPlan} />
      <MainStack.Screen name="BuyPremium" component={BuyPremium} />
      <MainStack.Screen name="ChatScreen" component={ChatScreen} />
      <MainStack.Screen name="ProfileEdit" component={ProfileEdit} />
      <MainStack.Screen name="Logs" component={Logs} />
      <MainStack.Screen name="NewWorkout" component={NewWorkout} />
      <MainStack.Screen name="NewWorkoutArea" component={NewWorkoutArea} />
      <MainStack.Screen name="EndWorkout" component={EndWorkout} />
    </MainStack.Navigator>
  );
};

const BottomTabBar = ({ navigation, state }) => {
  const HomeIcon = (props) => <Icon {...props} name="clipboard" />;
  const PremiumIcon = (props) => <Icon {...props} name="star" />;
  const ProfileIcon = (props) => <Icon {...props} name="person" />;
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={HomeIcon} title="Workout" />
      <BottomNavigationTab icon={PremiumIcon} title="Premium" />
      <BottomNavigationTab icon={ProfileIcon} title="Profile" />
    </BottomNavigation>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => (
  <Tabs.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Premium" component={Premium} />
    <Tabs.Screen name="Profile" component={Profile} />
  </Tabs.Navigator>
);

export default () => {
  const context = useContext(AuthContext);
  const user = context.user;

  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
