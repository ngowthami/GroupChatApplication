const axios = require('axios');

describe('All test cases', () => {
    let userToken;

    test('User can log in successfully', async () => {
        try {
            const response = await axios.post('http://localhost:8090/api/user/login', {
                username: 'gangasiva',
                password: 'Kore12346677',
            });
            expect(response.status).toBe(200);
            expect(response.data.token).toBeDefined();
            expect(response.data.token).toBeDefined();
            userToken = response.data.token;
        } catch (error) {
            console.error('Error during login:', error.message);
            throw error;
        }
    });
    test('Login Failure', async () => {
        try {
            const response = await axios.post('http://localhost:8090/api/user/login', {
                username: 'gangasiva',
                password: 'Kore1234667',
            });
            expect(response.status).toBe(401);
        } catch (error) {
            expect(error.response.status).toBe(401);
            expect(error.response.data).toBeDefined();
            expect(error.response.data.status).toBe('error');
        }
    });

    

    test('should create a user', async () => {
        try {
            const response = await axios.post(
                'http://localhost:8090/api/user/create',
                {
                    username: 'hhihi',
                    password: 'Kore12346677',
                    isAdmin: false
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                }
            );
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Error during user creation:', error.message);
            throw error;
        }
    });


    test('create user failure', async () => {
        try {
            const response = await axios.post('http://localhost:8090/api/user/create', {
                username: 'klkl',
                password: 'Kore1234667',
                isAdmin: false
            },
            {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imdvd3RoYW1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMDQxNDYxOCwiZXhwIjoxNzAwNDE4MjE4fQ.WbQ4KkkQ_z1ZUNrdT8h2w2BcmC8Xg_xzPNF7ZFGD2Fc`,
                },
            }
            );
            expect(response.status).toBe(401);
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
    });

    test('edit user', async () => {
        try {
            const response = await axios.put(
                'http://localhost:8090/api/user/u-4bf97ba3-e076-4091-acf6-d94c8d3acb69',
                {
                    username: 'hhhhh',
                    password: 'Kore12346677',
                    isAdmin: true
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                }
            );
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Error during logout:', error.message);
            throw error;
        }
    });


    test('edit user failure', async () => {
        try {
            const response = await axios.put('http://localhost:8090/api/user/u-1d407f68-18cb-43d5-b70f-a708d819cc27', {
                username: 'gangasiva',
                password: 'Kore1234667',
                isAdmin: true
            },
            {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imdvd3RoYW1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMDQxNDYxOCwiZXhwIjoxNzAwNDE4MjE4fQ.WbQ4KkkQ_z1ZUNrdT8h2w2BcmC8Xg_xzPNF7ZFGD2Fc`,
                },
            }
            );
            expect(response.status).toBe(401);
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
    });

    test('should create a new group', async () => {
        try {
            const response = await axios.post(
                'http://localhost:8090/api/group/create',
                {
                    "name": "Grp38989000",
                    "members": [
                        "u-1d407f68-18cb-43d5-b70f-a708d819cc27",
                        "u-81e45ddd-a68c-4e3e-845b-0e3a1da25da3"
                    ]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                }
            );
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Error during logout:', error.message);
            throw error;
        }
    });


    test('create a new group failure', async () => {
        try {
            const response = await axios.post('http://localhost:8090/api/group/create', {
                "name": "Grp3",
                "members": [
                    "u-1d407f68-18cb-43d5-b70f-a708d819cc27",
                    "u-81e45ddd-a68c-4e3e-845b-0e3a1da25da3"
                ]
            });
            expect(response.status).toBe(401);
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
    });


    test('should send a message to a group user', async () => {
        try {
            const response = await axios.post(
                'http://localhost:8090/api/message/grp-4c6a7677-737c-46a3-8691-efc0aa7b5b3f/users/u-1d407f68-18cb-43d5-b70f-a708d819cc27/send',
                {
                    text: 'hi',
                    sender: 'gowthamin',
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                }
            );
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Error during message sending:', error.message);
            throw error;
        }
    });


    test('send a message failure', async () => {
        try {
            const response = await axios.post('http://localhost:8090/api/message/grp-4c6a7677-737c-46a3-8691-efc0aa7b5b3f/users/u-1d407f68-18cb-43d5-b70f-a708d819cc29/send', {
                text: 'hi',
                sender: 'gowthamin',
            },
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            }
            );
            expect(response.status).toBe(401);
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
    });




    test('should delete a group', async () => {
        try {
            const response = await axios.delete(
                'http://localhost:8090/api/group/grp-25e13cd7-82eb-46f5-88ae-ee6b1989b882',
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                }
            );
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Error during logout:', error.message);
            throw error;
        }
    });

    test('delete a group failure', async () => {
        try {
            const response = await axios.delete(
                'http://localhost:8090/api/group/grp-e2cf0a61-dbd5-4c02-9d85-e6f003f7ee3f',
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                }
            );
            expect(response.status).toBe(401);
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
    });
    

    test('should log out a user', async () => {
        try {
            const response = await axios.post(
                'http://localhost:8090/api/user/logout',
                {
                    username: 'gangasiva',
                    password: 'Kore12346677',
                },
                {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                    },
                }
            );
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Error during logout:', error.message);
            throw error;
        }
    });


    test('Logout Failure', async () => {
        try {
            const response = await axios.post('http://localhost:8090/api/user/logout', {
                username: 'gangasiva',
                password: 'Kore1234667',
            });
            expect(response.status).toBe(401);
        } catch (error) {
            expect(error.response.status).toBe(401);
        }
    });
});
