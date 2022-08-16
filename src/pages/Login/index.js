import React, { Component } from 'react'
import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import './index.scss'
import logo from 'assets/logo.png'
import { login } from 'api/user'

export default class Login extends Component {
  render() {
    return (
      <div className='login'>
        <Card className='login-container'>
            <img src={logo} className='login-logo'/>
            {/* 登录表单 */}
            <Form
                size='large'
                autoComplete="off"
                validateTrigger={['onChange', 'onBlur']}
                onFinish={this.onFinish}
                initialValues={{
                    mobile: '13911111111',
                    code: '246810',
                    agree: true
                }}
                >
                <Form.Item
                    name="mobile"
                    
                    rules={[
                    {
                        required: true,
                        message: '手机号不能为空',
                    },
                    {
                        pattern: /^1[3-9]\d{9}$/,
                        message: '手机号格式错误'
                    }
                    ]}
                >
                    <Input placeholder='请输入您的手机号码'/>
                </Form.Item>

                <Form.Item
                    
                    name="code"
                    rules={[
                    {
                        required: true,
                        message: '验证码不能为空',
                    },
                    {
                        pattern: /^\d{6}$/,
                        message: '验证码格式错误'
                    }
                    ]}
                >
                    <Input.Password placeholder='请输入您的账户密码'/>
                </Form.Item>

                <Form.Item
                    valuePropName="checked" 
                    name="agree"
                    rules={[
                        {
                            // 自定义校验规则
                            validator(rule, value) {
                                if (value) {
                                    return Promise.resolve(0)
                                } else {
                                    return Promise.reject(new Error('请阅读并同意用户协议'))
                                }
                            }
                        }
                    ]}

                >
                    <Checkbox>我已阅读并同意【隐私条款】和【用户协议】</Checkbox>
                </Form.Item>

                <Form.Item

                >
                    <Button type="primary" htmlType="submit" block>
                    登录
                    </Button>
                </Form.Item>
                </Form>

        </Card>
      </div>
    )
  }

    onFinish = async ({ mobile, code }) => {
        try {
            const res = await login(mobile, code)
            console.log(res);
            // 登陆成功
            // 1.保存token
            localStorage.setItem('token', res.data.token)
            // 2.跳转到首页
            this.props.history.push('/home')
            // 3.提示消息
            message.success('登录成功', 1)
        } catch(error) {
            // console.dir(error);
            // alert(error.response.data.message)
            console.log(error);
            message.warning(error.response.data.message, 1)
        }

    }
}

