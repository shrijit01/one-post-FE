import RootNavigation from './navigation';
import { NavigationContainer } from "@react-navigation/native";

export default function App() {

  return (
    <NavigationContainer>
      {/* <AuthProvider>
        <stack.Navigator initialRouteName='Login'>
          <stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <stack.Screen name="Register" component={Register} options={{ headerShown: false, presentation: 'modal' }} />
          <stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </stack.Navigator>
      </AuthProvider> */}
      <RootNavigation />
    </NavigationContainer>
  );
}
