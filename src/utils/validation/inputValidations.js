export const email_validation = {
    name: 'email',
    type: 'email',
    id: 'email',
    placeholder: 'Email Address',
    autocomplete: 'email',
    validation: {
        required: {
            value: true,
            message: 'Email is required',
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Invalid email format',
        },
    },
};

export const password_validation = {
    name: 'password',
    type: 'password',
    id: 'password',
    placeholder: 'Password',
    autocomplete: 'new-password',
    validation: {
        required: {
            value: true,
            message: 'Password is required',
        }
    },
};


export const create_password_validation = {
    name: 'password',
    type: 'password',
    id: 'password',
    placeholder: 'Password',
    autocomplete: 'new-password',
    validation: {
        required: {
            value: true,
            message: 'Password is required',
        },
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters long',
        },
        validate: {
            hasNumber: value => /\d/.test(value) || 'Password must contain at least one number',
            hasSpecialChar: value => /[!@#$%&?]/.test(value) || 'Password must contain at least one special character (!, @, #, $, %, &, ?)',
            hasCapitalLetter: value => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
        },
    },
};

export const confirm_password_validation = {
    name: 'confirm-password',
    type: 'password',
    id: 'confirm-password',
    placeholder: 'Confirm Password',
    validation: {
        required: {
            value: true,
            message: 'Password confirmation is required',
        },
        validate: {
            matchesPassword: (value, { password }) => value === password || 'Passwords must match',
        }
    },
};


