import API from '../api-config/api-config';

/* --------------------- Registration API ------------------------------ */
const signup=async(data)=>{
    try {

        const response = await fetch(API.signup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

/* --------------------- Login API ------------------------------ */
const login =async(data)=>{
    try {
        console.log(API.login);
        const response = await fetch(API.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export { signup, login };
