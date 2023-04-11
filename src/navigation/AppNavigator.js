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

//Screens
import Home from "../screens/Home";
import NewRequest from "../screens/NewRequest";
import NewRider from "../screens/NewRider";
import Confirmation from "../screens/Confirmation";
import Ongoing from "../screens/Ongoing";
import PaymentMethods from "../screens/PaymentMethods";
import NewPayment from "../screens/NewPayment";
import ProfileInformation from "../screens/ProfileInformation";
import Request from "../screens/Request";
import TrackLocation from "../screens/TrackLocation";
import ChangeLocation from "../screens/ChangeLocation";
import Requests from "../screens/Requests";
import OngoingRequests from "../screens/OngoingRequests";
import Profile from "../screens/Profile";
import Help from "../screens/Help";
import Loading from "../screens/utils/Loading";
// Auth screens
import Login from "../screens/auth/Login";
import Welcome from "../screens/auth/Welcome";
import Details from "../screens/auth/Details";
import Areas from "../screens/auth/Areas";
import Type from "../screens/auth/Type";
import Register from "../screens/auth/Register";
import ForgotPassword from "../screens/auth/ForgotPassword";

const firebaseConfig = {
  apiKey: "AIzaSyAFEUeW1W7Yt0DwEwnckX2A0zgwLXx25OA",
  authDomain: "lean-fitness-ravindu.firebaseapp.com",
  projectId: "lean-fitness-ravindu",
  storageBucket: "lean-fitness-ravindu.appspot.com",
  messagingSenderId: "347051387393",
  appId: "1:347051387393:web:7c7430fa85b05d5fc3ae00",
  databaseURL: "https://lean-fitness-ravindu.app.firebaseio.com",
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
      <MainStack.Screen name="NewRequest" component={NewRequest} />
      <MainStack.Screen name="NewRider" component={NewRider} />
      <MainStack.Screen name="Confirmation" component={Confirmation} />
      <MainStack.Screen name="Ongoing" component={Ongoing} />
      <MainStack.Screen name="OngoingRequests" component={OngoingRequests} />
      <MainStack.Screen name="PaymentMethods" component={PaymentMethods} />
      <MainStack.Screen name="NewPayment" component={NewPayment} />
      <MainStack.Screen name="Help" component={Help} />
      <MainStack.Screen
        name="ProfileInformation"
        component={ProfileInformation}
      />
      <MainStack.Screen name="Request" component={Request} />
      <MainStack.Screen name="TrackLocation" component={TrackLocation} />
      <MainStack.Screen name="ChangeLocation" component={ChangeLocation} />
    </MainStack.Navigator>
  );
};

const BottomTabBar = ({ navigation, state }) => {
  const HomeIcon = (props) => <Icon {...props} name="clipboard" />;
  const RequestIcon = (props) => <Icon {...props} name="star" />;
  const ProfileIcon = (props) => <Icon {...props} name="person" />;
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={HomeIcon} title="Workout" />
      <BottomNavigationTab icon={RequestIcon} title="Premium" />
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
    <Tabs.Screen name="Requests" component={Requests} />
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
