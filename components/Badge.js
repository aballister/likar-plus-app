import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Badge({ onPress, value }) {
    const Component = onPress ? TouchableOpacity : View;
    return (
        <View style={{ position: 'absolute', top: -4, right: 2 }}>
            <Component style={{
                alignSelf: 'center',
                minWidth: 10,
                height: 10,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#52c41a',
                borderWidth: 1,
                borderColor: '#fff',
                overflow: 'hidden',
            }}
            >
                <Text>
                    {value}
                </Text>
            </Component>
        </View>
    );
}

Badge.propTypes = {
    onPress: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Badge.defaultProps = {
    onPress: undefined,
    value: undefined,
};