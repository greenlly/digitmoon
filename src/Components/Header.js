import React from "react";
import { message, PageHeader, Typography, Button } from "antd";
import Login from "./Login"
import Write from "./Write"
import Register from "./register"

const { Link, Text } = Typography;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            logged: false,
            showLogin: false,
            showReg: false,
            showWrite: false,
            logoutSpin: false
        }
    }
    backFunc = () => null;
    setLoginVisible = () => {
        this.setState({
            showLogin: true
        })
    }
    setWriteVisible = () => {
        this.setState({
            showWrite: true
        })
    }
    logout = () => {
        this.setState({
            logoutSpin: true
        })
        localStorage.removeItem("access_token");
        this.setState({
            logged: false,
            token: null,
            logoutSpin: false
        })
        message.success("منتظر مطلک های بعدی تو هستیم!")

    }
    setLogin = (token) => {
        this.setState({
            logged: true,
            token: token
        })
    }
    componentDidMount = () => {
        const token = localStorage.getItem("access_token");
        if (token) {
            this.setState({
                token: token,
                logged: true
            })
        } else {
            this.setState({
                token: null,
                logged: false
            })
        }
    }
    render() {
        const { isHome } = this.props;
        return (
            <>
                <PageHeader
                    //ghost={false}
                    className="site-page-header"
                    onBack={isHome ? null : this.backFunc}
                    title={
                        <Link href="http://localhost:3000/">
                            <Text >
                                مطلک
                            </Text>
                        </Link>
                    }
                    subTitle={
                        <Text type="secondary">
                            تلخ بخند!
                        </Text>
                    }
                    avatar={{
                        src: "https://image.flaticon.com/icons/png/512/4470/4470626.png"
                    }}
                    extra={this.state.logged ? [
                        <Button className="header-home-button" key="2" type="dashed" danger onClick={this.logout} loading={this.state.logoutSpin}>
                            خروج
                        </Button>,
                        <Button className="header-home-button" key="1" type="primary" onClick={this.setWriteVisible}>
                            نوشتن
                        </Button>
                    ] : [
                        <Button className="header-home-button" key="3" type="primary" onClick={this.setLoginVisible}>
                            ورود
                        </Button>
                    ]}
                />
                <Login
                    onOk={() => this.setState({ showLogin: false })}
                    onCancel={() => this.setState({ showLogin: false })}
                    onReg={() => this.setState({ showReg: true })}
                    visible={this.state.showLogin}
                    logged={this.setLogin}
                />
                <Register
                    onOk={() => this.setState({ showReg: false })}
                    onCancel={() => this.setState({ showReg: false })}
                    onLogin={() => this.setState({ showLogin: true })}
                    visible={this.state.showReg}
                    logged={this.setLogin}
                />
                <Write
                    onOk={() => this.setState({ showWrite: false })}
                    onCancel={() => this.setState({ showWrite: false })}
                    visible={this.state.showWrite}
                    addMatalak={this.props.addMatalak}
                />
            </>
        )
    }
}

export default Header;
