const validationFields = {

    // Auth fields
    email: {
        presence: {
            message: '^Please enter email address',
            allowEmpty: false
        },
        email: {
            message: '^Please enter a valid email address'
        }
    },
    password: {
        presence: {
            message: '^Please enter a password',
            allowEmpty: false
        }
    },
    setPassword: {
        presence: {
            message: '^Please enter new password',
            allowEmpty: false
        },
        length: {
            minimum: 5,
            message: '^Your password must be at least 5 characters'
        }
    },
    confirmPassword: {
        equality: {
            attribute: 'setPassword',
            message: '^Passwords are not equal'
        },
        presence: {
            message: '^Please confirm password',
            allowEmpty: false
        }
    },
    firstName: {
        presence: {
            message: '^Please enter first name',
            allowEmpty: false
        }
    },
    lastName: {
        presence: {
            message: '^Please enter last name',
            allowEmpty: false
        }
    },

    // Item add/update fields
    name: {
        presence: {
            message: '^Please enter name',
            allowEmpty: false
        }
    },
    desc: {
        presence: {
            message: '^Please enter description',
            allowEmpty: false
        }
    },
    year: {
        presence: {
            message: '^Please enter year',
            allowEmpty: false
        },
        format: {
            pattern: '\\d+$',
            message: '^Year can contain digits only'
        }
    },
    price: {
        presence: {
            message: '^Please enter price',
            allowEmpty: false
        },
        format: {
            pattern: '^\\d+\\.?(\\d+|\\d?)',
            message: '^Price can contain digits only'
        }
    },
    available: {
        presence: {
            message: '^Please enter available quantity',
            allowEmpty: false
        },
        format: {
            pattern: '\\d+$',
            message: '^Available quantity can contain integers only'
        }
    },
    country: {
        presence: {
            message: '^Please enter country',
            allowEmpty: false
        },
        format: {
            pattern: '[a-zA-Z]+',
            message: '^Country can contain letters only'
        }
    },
    image: {
        presence: {
            message: '^Please set image path ',
            allowEmpty: false
        }
    },
    thumbnail: {
        presence: {
            message: '^Please set thumbnail path ',
            allowEmpty: false
        }
    },

    // Delivery fields
    address:  {
        presence: {
            message: '^Please enter address',
            allowEmpty: false
        }
    },
    deliveryCountry:  {
        presence: {
            message: '^Please enter country',
            allowEmpty: false
        },
        format: {
            pattern: '[a-zA-Z]+',
            message: '^Country can contain letters only'
        }
    },
    city:  {
        presence: {
            message: '^Please enter city',
            allowEmpty: false
        }
    },
    zip:  {
        presence: {
            message: '^Please enter postal code',
            allowEmpty: false
        },
        format: {
            pattern: '^[0-9]{5}(?:-[0-9]{4})?$',
            message: '^Postal code can contain only numbers and "-"'
        }
    },
    phone:  {
        format: {
            pattern: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$',
            message: '^Please enter the valid phone'
        },
        length: {
            minimum: 5
        }
    },
};

export default validationFields;