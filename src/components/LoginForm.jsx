
import { Button, Checkbox, Form, Input, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios'
import { useState } from 'react';

const LoginForm = () => {
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

    //error message on login
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Invalid credatials',
        });
        setLoadStatus(false)
        setBlurState({
            filter: 'blur(0)'
        })
    };

    //Success message on login
    const success = (name) => {
        messageApi.open({
            type: 'success',
            content: `Welcome back ${name}`,
        });
        setLoadStatus(false)
        setBlurState({
            filter: 'blur(0)'
        })
    };

    //Validate user credentials
    const onFinish = async (values) => {

        try {
            setLoadStatus(true)
            setBlurState({
                filter: 'blur(4px)'
            })

            const resp = await axios.post('https://blooming-cliffs-25018.herokuapp.com/user/login',
                {
                    username: values.username,
                    password: values.password
                })

            //If credatials valid create object to store JWT.
            //EXPIRE date 24 hours after issue time.
            if (resp.data.auth) {
                const token_info = {
                    "username": values.username,
                    "token": resp.data.token,
                    "expiration": Math.floor(new Date().getTime() / 1000.0) + 86400
                }
                //Store JWT in local storage if 'remeber me; == YES
                if (resp.data.remember) {
                    localStorage.setItem('token_info', JSON.stringify(token_info))
                }
                //If 'remember me' == FALSE store in session storage
                else {
                    sessionStorage.setItem('token_info', JSON.stringify(token_info))
                }
                document.location.href = '/'
                success(values.username)
            }
        } catch (err) {
            // Handle Error Here
            error()
        }
    };

    return (
        <>
            {/* loading animation for async login */}
            <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 z-20">
                {loadStatus ? <Spin indicator={antIcon} /> : null}
            </div>
            {/* login form */}
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
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={error}
                    autoComplete="off"
                >
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
                        <Checkbox>Remember me</Checkbox>
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
    )
}

export default LoginForm