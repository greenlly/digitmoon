import React from "react";
import { message, Modal, Form, Input, Button } from "antd";
import API from "../api";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    onFinish = (values) => {
        this.setState({
            loading: true
        })
        const { firstName, lastName, email, age, username, password } = values;
        const data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            age: age,
            username: username,
            password: password
        }
        API.post("users/new", JSON.stringify(data))
            .then(result => {
                if (result.status === 200) {
                    console.log("PogChamp!", result.data);
                    this.props.onOk();
                    this.props.onLogin();
                    message.success("ثبت شدی؛ حالا اگر میخوای وارد شو!");
                } else {
                    console.log("Login failed!: ", result);
                    message.error("اطلاعات صحیح نمی‌باشند!");
                }
                this.setState({
                    loading: false
                })
            })
            .catch(e => {
                console.log("Login failed!: ", e);
                if (e.message === "Request failed with status code 403") {
                    message.error("اجازه نداری؟!");
                } else {
                    message.error("خطای عجیبی رخ داده است! لطفا بعدا امتحان کنید.");
                }
                this.setState({
                    loading: false
                })
            })
    };
    onFinishFailed = (errorInfo) => {
        this.setState({
            loading: false
        })
        console.log('Failed:', errorInfo);
        message.error("خطای عجیبی رخ داده است! لطفا بعدا امتحان کنید.");
    };
    render() {
        const { visible, onOk, onCancel } = this.props;
        const layout = {};
        const tailLayout = {
            wrapperCol: { offset: 4, span: 18 },
        };
        return (
            <Modal
                title="ثبت نام"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                footer={null}
            >
                <Form
                    {...layout}
                    name="اطلاعات خود را وارد کنید"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="نام"
                        name="firstName"
                        rules={[{ required: true, message: 'لطفا نام خود را وارد کنید!' }]}
                    >
                        <Input
                        />
                    </Form.Item>
                    <Form.Item
                        label="نام خانوادگی"
                        name="lastName"
                        rules={[{ required: true, message: 'لطفا نام خانوادگی خود را وارد کنید!' }]}
                    >
                        <Input
                        />
                    </Form.Item>
                    <Form.Item
                        label="سن"
                        name="age"
                        rules={[{ required: true, message: 'لطفا سن خود را وارد کنید!' }]}
                    >
                        <Input
                            style={{ direction: 'ltr' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="ایمیل"
                        name="email"
                        rules={[{ required: true, message: 'لطفا ایمیل خود را وارد کنید!' }]}
                    >
                        <Input
                            style={{ direction: 'ltr' }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="نام کاربری"
                        name="username"
                        rules={[{ required: true, message: 'لطفا نام کاربری خود را وارد کنید!' }]}
                    >
                        <Input
                            style={{ direction: 'ltr' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="گذرواژه"
                        name="password"
                        rules={[{ required: true, message: 'لطفا گذرواژه خود را وارد کنید!' }]}
                    >
                        <Input.Password
                            style={{ direction: 'ltr' }}
                        />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}>
                            ثبت نام
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Login;
