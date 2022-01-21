import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
export default function LineChart({ coinHistory, currentPrice, coinName }) {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinPrice.push(coinHistory.data.history[i].price);
        coinTimestamp.push(
            new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
        );
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: "Price in USD",
                data: coinPrice,
                fill: false,
                backgroundColor: "#0071bd",
                bordercolor: "#0071bd",
            },
        ],
    };
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return (
        <>
            <Row>
                <Typography.Title level={2}>
                    {coinName} Price chart
                </Typography.Title>
                <Col>
                    <Typography.Title>
                        {coinHistory?.data?.change}%
                    </Typography.Title>
                    <Typography.Title>
                        Current {coinName} price: $ {currentPrice}
                    </Typography.Title>
                </Col>
            </Row>
            {/* <Line data={data} options={options} /> */}
        </>
    );
}
