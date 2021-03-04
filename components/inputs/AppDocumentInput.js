import React from 'react';
import PropTypes from 'prop-types';
import * as DocumentPicker from 'expo-document-picker';
import { Button, Text, View } from 'react-native';
import AppTouchable from '../AppTouchable';

export default function AppDocumentInput({ onChange, value }) {
    async function documentPickHandler() {
        const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
        onChange(result);
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AppTouchable onPress={documentPickHandler}>
                <View style={{ height: '100%', flex: 1 }}>
                    <Text
                        numberOfLines={1}
                        style={{ flex: 1, paddingHorizontal: 10 }}
                    >
                        {value.name}
                    </Text>
                </View>
            </AppTouchable>
            <Button
                onPress={documentPickHandler}
                title='Виберіть файл'
            />
        </View>
    );
}

AppDocumentInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object,
};

AppDocumentInput.defaultProps = {
    value: {},
};