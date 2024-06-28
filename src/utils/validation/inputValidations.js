export const name_validation = {
    name: 'name',
    type: 'text',
    id: 'name',
    placeholder: 'Full Name',
    autocomplete: 'name',
    validation: {
        required: {
            value: true,
            message: 'Full name is required',
        }
    },
};

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
    autocomplete: 'new-password',
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

export const weight_validation = {
    name: 'weight',
    type: 'number',
    id: 'weight',
    size: 'small',
    placeholder: 'Weight (kg)',
    validation: {
        required: {
            value: true,
            message: 'Weight is required',
        },
        min: {
            value: 1,
            message: 'Weight must be at least 1 kg',
        }
    },
};

export const height_validation = {
    name: 'height',
    type: 'number',
    id: 'height',
    size: 'small',
    placeholder: 'Height (cm)',
    validation: {
        required: {
            value: true,
            message: 'Height is required',
        },
        min: {
            value: 30,
            message: 'Height must be at least 30 cm',
        }
    },
};
