import React, { useState, useEffect } from 'react';
import {
    Text, View, StyleSheet, Animated, TouchableOpacity,
} from 'react-native';
import AppTouchable from './AppTouchable';
import Icon from './Icon';

export default function Collapsible({ title, children }) {
    const [titleHeight, setTitleHeight] = useState(10);
    const [animatedHeight, setAnimatedHeight] = useState(new Animated.Value(titleHeight));
    const [dynamicHeight, setDynamicHeight] = useState(0);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setAnimatedHeight(new Animated.Value(titleHeight));
    }, [titleHeight]);

    const toggleDropdown = () => {
        if (expanded) {
            // collapse dropdown
            Animated.timing(animatedHeight, {
                toValue: titleHeight,
                duration: 200,
                useNativeDriver: false,
            }).start();
        } else {
            // expand dropdown
            Animated.timing(animatedHeight, {
                toValue: dynamicHeight,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
        setExpanded(state => !state);
    };

    return (
        <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
            <View
                onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setTitleHeight(height);
                }}
            >
                <AppTouchable onPress={toggleDropdown}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>
                            {title}
                        </Text>
                        <Icon
                            color='#000'
                            name={expanded ? 'chevron-up' : 'chevron-down'}
                            size={21}
                        />
                    </View>
                </AppTouchable>
            </View>
            <View
                onLayout={(event) => {
                    const { height, y } = event.nativeEvent.layout;
                    console.log(event.nativeEvent);
                    setDynamicHeight(height + y);
                }}
            >
                {children}
            </View>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        width: '95%',
        marginBottom: 5,
        marginHorizontal: 5,
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    leftContainer: {
        justifyContent: 'space-between',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: '#454A66',
    },
    toggleBtn: {
        backgroundColor: 'yellow',
        borderWidth: 1,
        borderRadius: 7,
        paddingTop: 4,
        paddingBottom: 2.5,
        paddingHorizontal: 4,
        marginLeft: 10,
        zIndex: 10,
    },
    bottomContainer: {
        marginVertical: 20,
    },
});