import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView, Button, SafeAreaView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import drfProvider from '../../providers/restProvider';
import FormInput from '../FormInput/FormInput';
import { translate } from '../../locale';
import { requestErrorHandler } from '../../utils';
import useHeaderSaveButton from '../../hooks/useHeaderSaveButton';
import useSettings from '../../hooks/useSettings';

export default function DriverForm({ route, navigation }) {
    const settings = useSettings();
    const item = route.params?.item;
    const formType = item && Object.keys(item).length ? 'edit' : 'create';
    const { fields } = settings[formType];
    let defaultValues = {};
    let method = 'POST';
    let url = settings.resource;
    let requestCallback = () => navigation.navigate(settings.list.screen);
    if (formType === 'edit') {
        method = 'PATCH';
        url += `/${item.id}`;
        requestCallback = updatedItem => navigation.navigate(settings.page.screen, {
            item: updatedItem,
        });

        defaultValues = { ...item };
        Object.keys(fields).forEach((field) => {
            if (fields[field].type === 'date') {
                defaultValues[field] = new Date(defaultValues[field]);
            }
        });
    }

    const methods = useForm({
        reValidateMode: 'onSubmit',
        defaultValues,
    });

    function submitHandler(data) {
        drfProvider(method, url, data, '')
            .then(requestCallback)
            .catch(requestErrorHandler);
    }

    useHeaderSaveButton(methods.handleSubmit(submitHandler));

    return (
        <FormProvider {...methods}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
                        style={{ flex: 1, padding: 10 }}
                    >
                        {
                            fields.map(field => (
                                <FormInput
                                    field={settings.fields[field]}
                                    key={field}
                                    name={field}
                                />
                            ))
                        }
                        <Button
                            onPress={methods.handleSubmit(submitHandler)}
                            title={translate('form.save')}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </FormProvider>
    );
}

DriverForm.propTypes = {
    navigation: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
};