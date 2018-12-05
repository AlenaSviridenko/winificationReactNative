import validation from 'validate.js';

import ValidationFields from './ValidationFields';

function validate(fieldName, value) {
    let formValues = {};
    let formFields = {};

    formValues[fieldName] = value;
    formFields[fieldName] = ValidationFields[fieldName];
    console.log(typeof value);

    const result = validation(formValues, formFields);

    if (result) {
        return result[fieldName][0];
    }

    return null;
}

function validateEqual(fields) {
    let formFields = {};

    if (Object.keys(fields).length !== 2) {
        return 'Incorrect validation parameters';
    }

    const keyOfEqualityField = Object.keys(fields)[1];

    formFields[keyOfEqualityField] = ValidationFields[keyOfEqualityField];

    const result = validation(fields, formFields);

    if (result) {
        return result[keyOfEqualityField][0];
    }

    return null;
}

export { validate, validateEqual };