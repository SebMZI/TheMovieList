import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'white', tabBarStyle: { paddingTop: 10, borderTopColor: "#272727", backgroundColor: '#272727' } }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => {
            if (color === 'white') {
              return <Image source={require("../../assets/images/icons/tab_home_active_icon.png")} alt="Home Active Icon" style={{ width: 24, height: 24 }} />;
            } else {
              return <Image source={require("../../assets/images/icons/tab_home_inactive_icon.png")} alt="Home Inactive Icon" style={{ width: 24, height: 24 }} />;
            }
          }
        }}
      />
      <Tabs.Screen
        name="watchlist"
        options={{
          title: 'Watchlist',
          headerShown: false,
          tabBarIcon: ({ color }) => {
            if (color === 'white') {
              return <Image source={require("../../assets/images/icons/tab_watchlist_active_icon.png")} alt="Watchlist Active Icon" style={{ width: 24, height: 24 }} />;
            } else {
              return <Image source={require("../../assets/images/icons/tab_watchlist_inactive_icon.png")} alt="Watchlist Inactive Icon" style={{ width: 24, height: 24 }} />;
            }
          }
        }}
      />
      
    </Tabs>
  );
}
