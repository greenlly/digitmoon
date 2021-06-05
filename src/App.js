import React from "react";
import { Row, Col, BackTop, Spin } from 'antd';
import Header from "./Components/Header";
import Matalak from "./Components/Matalak";
import API from "./api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: true,
      matalaks: []
    }
  }
  addMatalak = (matalak) => {
    let matalaks = this.state.matalaks
    matalaks.push(matalak)
    this.setState({
      matalaks: matalaks
    })
  }
  componentDidMount = () => {
    API.get("article")
      .then(result =>
        this.setState({
          spinning: false,
          matalaks: result.data
        })
      )
      .catch(e => console.log("Error wihle get articles: ", e));
  }
  render() {
    return (
      <React.Fragment>
        <BackTop />
        <Header
          isHome={true}
          addMatalak={this.addMatalak}
        />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={18} pull={4}>
            <Spin spinning={this.state.spinning} tip="در حال بارگیری...">
              {
                this.state.matalaks.reverse().map(matalak =>
                  <Matalak
                    title={matalak.Title}
                    content={matalak.Content}
                  />
                )
              }
            </Spin>
          </Col>
        </Row>
      </React.Fragment >
    );
  }
}

export default App;
