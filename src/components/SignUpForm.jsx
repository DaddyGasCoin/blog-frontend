
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios'
import { useState } from 'react';

const SignUpForm = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const [loadStatus, setLoadStatus] = useState(false)
    const [blurState, setBlurState] = useState({ filter: 'blur(0)' })

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 100,
            }}
            spin
        />
    );

    //Error message for creating account       
    const error = (error) => {
        if (error === 'invalid username')
            messageApi.open({
                type: 'error',
                content: 'Username already exists',
            });
        else {
            messageApi.open({
                type: 'error',
                content: 'Invalid details',
            });
        }
        setLoadStatus(false)
        setBlurState({
            filter: 'blur(0)'
        })
    };

    //Success message on login after creating account
    const success = () => {
        messageApi.open({
            type: 'success',
            content: `Account succesfully created`,
        });
        setLoadStatus(false)
        setBlurState({
            filter: 'blur(0)'
        })
    };

    const onFinish = async (values) => {

        try {
            setLoadStatus(true)
            setBlurState({
                filter: 'blur(4px)'
            })
            const resp = await axios.post('https://blog-backend-4u64.onrender.com/user/create',
                {
                    username: values.username,
                    password: values.password,
                    first_name: values.firstname,
                    last_name: values.lastname
                })
            const log = await axios.post('https://blog-backend-4u64.onrender.com/user/login',
                {
                    username: values.username,
                    password: values.password
                })
            // If credatials valid create object to store JWT.
            // EXPIRE date 24 hours after issue time.
            if (log.data.auth) {
                const token_info = {
                    "username": values.username,
                    "token": log.data.token,
                    "expiration": Math.floor(new Date().getTime() / 1000.0) + 86400
                }
                //Store JWT in local storage if 'remeber me; == YES
                if (values.remember) {
                    localStorage.setItem('token_info', JSON.stringify(token_info))
                }
                //If user chose to not stay signed in after creating account,
                //store in session storage.Else store in local storage
                else {
                    sessionStorage.setItem('token_info', JSON.stringify(token_info))
                }
                document.location.href = '/'
                success()
            }
        } catch (err) {
            // Handle Error Here
            error(err.response.data.error)
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-20">
                {loadStatus ? <Spin indicator={antIcon} /> : null}
            </div>
            <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2" style={blurState}>
                {contextHolder}
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="First Name"
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Stay Signed In</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );

}

export default SignUpForm