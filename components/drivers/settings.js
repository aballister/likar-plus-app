export default {
    fields: {
        lastName: {
            fieldType: 'text',
            validation: ['required'],
        },
        firstName: {
            fieldType: 'text',
            validation: ['required'],
        },
        middleName: {
            fieldType: 'text',
        },
        phone: {
            fieldType: 'phone',
            validation: ['required'],
            keyboardType: 'phone-pad',
        },
        phone2: {
            fieldType: 'phone',
            keyboardType: 'phone-pad',
        },
        dayPrice: {
            keyboardType: 'decimal-pad',
            defaultValue: '600',
            fieldType: 'text',
        },
        eveningPrice: {
            keyboardType: 'decimal-pad',
            defaultValue: '900',
            fieldType: 'text',
        },
        lessFive: {
            keyboardType: 'decimal-pad',
            defaultValue: '50',
            fieldType: 'text',
        },
        lessEleven: {
            keyboardType: 'decimal-pad',
            defaultValue: '75',
            fieldType: 'text',
        },
        aboveEleven: {
            keyboardType: 'decimal-pad',
            defaultValue: '100',
            fieldType: 'text',
        },
        comment: {
            multiline: true,
            fieldType: 'text',
        },
    },
    list: {
        fields: ['phone'],
        titleFields: ['lastName', 'firstName', 'middleName'],
        title: 'drivers.drivers',
        screen: 'Drivers',
    },
    page: {
        titleFields: ['lastName', 'firstName', 'middleName'],
        fields: [
            'phone', 'phone2', 'dayPrice', 'eveningPrice', 'lessFive', 'lessEleven', 'aboveEleven', 'comment',
        ],
        title: 'drivers.driver',
        screen: 'Driver',
    },
    edit: {
        fields: [
            'lastName', 'firstName', 'middleName', 'phone', 'phone2', 'dayPrice', 'eveningPrice', 'lessFive', 'lessEleven', 'aboveEleven', 'comment',
        ],
        title: 'drivers.editDriver',
        screen: 'DriverEdit',
    },
    create: {
        fields: [
            'lastName', 'firstName', 'middleName', 'phone', 'phone2', 'dayPrice', 'eveningPrice', 'lessFive', 'lessEleven', 'aboveEleven', 'comment',
        ],
        title: 'drivers.createDriver',
        screen: 'DriverCreate',
    },
    filter: {
        title: 'drivers.filterDrivers',
    },
    resource: 'drivers',
    searchKey: 'lastName',
};