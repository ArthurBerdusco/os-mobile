import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../screens/Home';
import Login from '../screens/Login';
import CameraOS from '../screens/CameraOS';
import OpenOrder from '../screens/OpenOrder';
import Corrective from '../screens/Corrective';
import InfoOrder from '../screens/InfoOrder';
import MenuModal from '../components/MenuModal';
import DrawerButton from '../components/DrawerButton';
import ExecuteOrder from '../screens/ExecuteOrder';
import History from '../screens/History';

const Stack = createStackNavigator();

const AppNavigation = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerLeft: () => (
                            <DrawerButton onPress={toggleModal} />
                        ),
                    }}
                />
                <Stack.Screen name="OpenOrder" component={OpenOrder} />
                <Stack.Screen name="Corrective" component={Corrective} />
                <Stack.Screen name="InfoOrder" component={InfoOrder} />
                <Stack.Screen name="ExecuteOrder" component={ExecuteOrder} />

                <Stack.Screen name="History" component={History} />


                <Stack.Screen name="CameraOS" component={CameraOS} options={{ headerShown: false }} />
            </Stack.Navigator>

            <MenuModal isVisible={isModalVisible} onClose={toggleModal} userName="Nome do Usuário" onDownloadOrders={() => console.log('Baixar Ordens')} onLogout={() => console.log('Sair')} />
        </NavigationContainer>
    );
};

export default AppNavigation;
