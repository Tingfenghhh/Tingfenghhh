/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space, Checkbox, Form, Input, message } from 'antd';
import { Link, useHistory } from "react-router-dom"
import logo from "../../assets/images/logo-250px.png"
import login from "../../assets/css/Login.module.less"
import "../../assets/css/HomeAntd.less"
import { logins } from "../../api/User"
export default function Login() {
    let history = useHistory()
    const onFinish = async (values) => {
        let res = await logins(values)
        if (res.code) {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo))
            message.success("登录成功")
            setTimeout(() => {
                history.replace("/home")
            }, 150);

        }
    };
    return (
        <div>
            <div className={login.main}>

                <div className={login.pain}>
                    <div className={login.logo}>
                        <img width="150px" src={logo} alt="" />
                    </div>
                    <div className={login.form}>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            {/* 用户名 */}
                            <Form.Item
                                name="account"
                                rules={[
                                    {
                                        required: true,
                                        message: '用户名不可以为空',
                                    },
                                    {
                                        pattern: /^[0-9A-Za-z]{6,10}$/,
                                        message: '用户名由6到10位的数字字母组成！！',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>

                            {/* 密码  */}
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '密码不可以为空',
                                    },
                                    {
                                        pattern: /^\d{6,10}$/,
                                        message: '密码由6到10位数字组成',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            {/* 记住我 */}
                            <Form.Item>
                                <Space>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>记住登录状态</Checkbox>
                                    </Form.Item>

                                    <a className="login-form-forgot" href="">
                                        忘记密码?
                                    </a>
                                </Space>
                            </Form.Item>
                            {/* 登录 */}
                            <Form.Item>
                                <Space>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        登录
                                    </Button>
                                    <Link to="/register">立即注册</Link>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>

                </div>


            </div>



        </div>
    )
}
