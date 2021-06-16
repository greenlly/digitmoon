import React from "react";
import { Typography, Card } from "antd";

const { Paragraph, Text } = Typography;

class Matalak extends React.Component {
    render() {
        const { title, content } = this.props;
        return (
            <React.Fragment>
                <Card
                    bordered={false}
                    style={{ marginTop: 16 }}
                    title={
                        <Text>
                            {title}
                        </Text>
                    }
                >
                    <Paragraph style={{ whiteSpace: 'pre-line' }}>
                        {content}
                    </Paragraph>
                </Card>
            </React.Fragment>
        )
    }
}

export default Matalak;
