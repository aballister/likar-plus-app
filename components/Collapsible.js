import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Animated } from 'react-native';
import AppTouchable from './AppTouchable';
import Icon from './Icon';
import theme from '../theme/theme';

export default function Collapsible({ title, children }) {
    const [titleHeight, setTitleHeight] = useState(0);
    const animatedController = useRef(new Animated.Value(0)).current;
    const [dynamicHeight, setDynamicHeight] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [animatedHeight, setAnimatedHeight] = useState();

    useEffect(() => {
        if (dynamicHeight) {
            setAnimatedHeight(animatedController.interpolate({
                inputRange: [0, 1],
                outputRange: [titleHeight, dynamicHeight],
            }));
        }
    }, [dynamicHeight]);

    function onPressHandler() {
        Animated.timing(animatedController, {
            toValue: expanded ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
        setExpanded(state => !state);
    }

    function setTitleSize(e) {
        const { height } = e.nativeEvent.layout;
        setTitleHeight(height);
    }

    function setContentSize(e) {
        const { height, y } = e.nativeEvent.layout;
        setDynamicHeight(height + y);
    }

    return (
        <Animated.View style={{ height: animatedHeight, overflow: 'hidden', marginBottom: 10 }}>
            <View onLayout={setTitleSize}>
                <AppTouchable onPress={onPressHandler}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>
                            {title}
                        </Text>
                        <Icon
                            color={theme.colors.black}
                            name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                            size={21}
                        />
                    </View>
                </AppTouchable>
            </View>
            <View onLayout={setContentSize}>
                {children}
            </View>
        </Animated.View>
    );
}

Collapsible.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    title: PropTypes.string.isRequired,
};