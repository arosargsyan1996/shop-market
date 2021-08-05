const user = {
    authorized: 'User not authorized',
    noAccess: 'You have no access',
    authentication: 'Incorrect email or password',
    email: {
        isEmail: 'Invalid email',
        isUnique: 'User with email already exists'
    },
    password: {
        isLength: 'Password must be at least 8 and no more than 32 characters long'
    },
};

module.exports = { user };