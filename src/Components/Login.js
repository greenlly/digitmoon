import React from "react";
import { message, Modal, Form, Input, Button, Checkbox } from "antd";
import API from "../api";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
    showRegister = () => {
        this.props.onCancel();
        this.props.onReg();
    }
    onFinish = (values) => {
        this.setState({
            loading: true
        })
        const { username, password } = values;
        const data = {
            username: username,
            password: password
        }
        API.post("user/login", JSON.stringify(data))
            .then(result => {
                if (result.status === 200) {
                    console.log("PogChamp!", result.data);
                    localStorage.setItem("access_token", result.data.token);
                    this.props.logged(result.data.token);
                    this.props.onOk();
                    message.success("خوش آمدی!");
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
                    message.error("اطلاعات صحیح نمی‌باشند!");
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
        // const tailLayout = {
        //     wrapperCol: { offset: 4, span: 18 },
        // };
        return (
            <Modal
                title="ورود"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                footer={null}
            >
                <Form
                    {...layout}
                    name="اطلاعات ورود خود را وارد کنید"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
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

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>من رو یادت نره!</Checkbox>
                        <Button style={{ float: 'left' }} type="primary" htmlType="submit" loading={this.state.loading}>
                            ورود
                        </Button>
                        <Button link onClick={this.showRegister}>
                            ثبت نام
                        </Button>
                    </Form.Item>
                </Form>
            </Modal >
        )
    }
}

export default Login;
