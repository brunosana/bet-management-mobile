import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CreateBet } from '../../screens/CreateBet';
import { FinishBet } from '../../screens/FinishBet';

const Navigator = createStackNavigator();

const CreateBetNavigator: React.FC = () => {
    return (
        <Navigator.Navigator
             initialRouteName='create'
             screenOptions={{
                 headerShown: false,
             }}
        >
            <Navigator.Screen name='Create' component={CreateBet} />
            <Navigator.Screen name='Finish' component={FinishBet} />
        </Navigator.Navigator>
    );
}

export { CreateBetNavigator };