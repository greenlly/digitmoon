import React from "react";
import { message, Modal, Form, Input, Button } from "antd";
import API from "../api";

const { TextArea } = Input;

class Write extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            descriptions: "",
            content: "",
            loading: false
        }
    }
    titleHandler = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    desHandler = (e) => {
        this.setState({
            descriptions: e.target.value
        })
    }
    contentHandler = (e) => {
        this.setState({
            content: e.target.value
        })
    }
    onFinish = (values) => {
        this.setState({
            loading: true
        })
        const { title, descriptions, content } = this.state;
        const data = {
            title: title,
            descriptions: descriptions,
            content: content
        }
        const token = localStorage.getItem("access_token");
        let header = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        API.post("articles", JSON.stringify(data), header)
            .then(result => {
                if (result.status === 200) {
                    console.log("PogChamp!", result.data);
                    this.props.addMatalak({
                        Title: data.title,
                        Content: data.content
                    });
                    this.props.onOk();
                    message.success("نوشتت با موفقیت ثبت شد!");
                    this.setState({
                        title: "",
                        descriptions: "",
                        content: "",
                    })
                } else {
                    console.log("Login failed!: ", result);
                    message.error("اجازه نداری!");
                }
                this.setState({
                    loading: false
                })
            })
            .catch(e => {
                console.log("Login failed!: ", e);
                if (e.message === "Request failed with status code 403") {
                    message.error("اجازه نداری!");
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
        const { title, descriptions, content } = this.state;
        return (
            <Modal
                title="مطلک بگو!"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                footer={[
                    <Button key="submit" type="primary" loading={this.state.loading} onClick={this.onFinish}>
                        خودشه
                    </Button>,
                    <Button key="back" onClick={onCancel}>
                        بیخیال
                    </Button>,
                ]}
            >
                <Form
                    {...layout}
                    name="محتویات مطلک خود را وارد کنید"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="عنوان"
                        name="title"
                        rules={[{ required: true, message: 'لطفا عنوان مطلک خود را وارد کنید!' }]}
                    >
                        <Input
                            value={title}
                            defaultValue={title}
                            onChange={this.titleHandler}
                        />
                    </Form.Item>

                    <Form.Item
                        label="توضیحات"
                        name="descriptions"
                        rules={[{ required: true, message: 'لطفا توضیحات مطلک خود را وارد کنید!' }]}
                    >
                        <Input
                            value={descriptions}
                            defaultValue={descriptions}
                            onChange={this.desHandler}
                        />
                    </Form.Item>

                    <Form.Item
                        label="محتوای اصلی"
                        name="content"
                        rules={[{ required: true, message: 'لطفا محتوای اصلی مطلک خود را وارد کنید!' }]}
                    >
                        <TextArea
                            autoSize={true}
                            value={content}
                            defaultValue={content}
                            onChange={this.contentHandler}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Write;
