import AppPhoneInput from './AppPhoneInput';
import AppTextInput from './AppTextInput';
import AppDateInput from './AppDateInput';
import AppPickerInput from './AppPickerInput';
import AppSwitchInput from './AppSwitchInput';
import AppCheckboxInput from './AppCheckboxInput';
import AppCheckboxGroupInput from './AppCheckboxGroupInput';
import AppDocumentInput from './AppDocumentInput';

export default {
    text: AppTextInput,
    phone: AppPhoneInput,
    document: AppDocumentInput,
    email: AppTextInput,
    date: AppDateInput,
    picker: AppPickerInput,
    switch: AppSwitchInput,
    checkbox: AppCheckboxInput,
    checkboxGroup: AppCheckboxGroupInput,
};