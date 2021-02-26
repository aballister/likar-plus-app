import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import theme from '../theme/theme';
import DoctorsScreen from '../screens/doctors/DoctorsScreen';
import DoctorScreen from '../screens/doctors/DoctorScreen';
import DoctorCreateScreen from '../screens/doctors/DoctorCreateScreen';
import DoctorEditScreen from '../screens/doctors/DoctorEditScreen';

const DoctorsStackNavigator = createStackNavigator();

export default function DoctorsNavigator() {
    return (
        <DoctorsStackNavigator.Navigator
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                gestureEnabled: true,
                headerTintColor: theme.colors.white,
                headerStyle: {
                    backgroundColor: '#4a148c',
                },
            }}
        >
            <DoctorsStackNavigator.Screen
                component={DoctorsScreen}
                name='Doctors'
                options={{
                    title: 'Лікарі',
                }}
            />
            <DoctorsStackNavigator.Screen
                component={DoctorScreen}
                name='Doctor'
                options={{
                    title: 'Лікар',
                }}
            />
            <DoctorsStackNavigator.Screen
                component={DoctorCreateScreen}
                name='DoctorCreate'
                options={{
                    title: 'Новий лікар',
                }}
            />
            <DoctorsStackNavigator.Screen
                component={DoctorEditScreen}
                name='DoctorEdit'
                options={{
                    title: 'Редагування лікаря',
                }}
            />
        </DoctorsStackNavigator.Navigator>
    );
}