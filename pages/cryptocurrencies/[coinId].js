import { useState } from "react";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} from "@/src/services/cryptoApi";
import LineChart from "@/components/LineChart";
export default function CryptoChild({ coinId }) {
    const { data: cryptoDetails, isFetching } =
        useGetCryptoDetailsQuery(coinId);
    console.log({ coinId });
    // const timePeriod = "";
    const [timePeriod, setTimePeriod] = useState("7d");
    const { data: coinHistory, isFetching: isFetchingHistory } =
        useGetCryptoHistoryQuery({
            coinId,
            timePeriod,
        });

    const time = ["3h", "24h", "7d", "30d", "3m", "1yr", "3y", "5y"];

    if (isFetching) return "Loading Details...";
    if (isFetchingHistory) return "Loading History...";
    console.log({ coinHistory });
    const { coin } = cryptoDetails.data;
    console.log({ coin });
    return (
        <>
            <div>
                <Typography.Title>{coin.name}</Typography.Title>
            </div>
            <div>{HTMLReactParser(coin.description)}</div>
            <Select
                defaultValue={timePeriod}
                placeholder="Select time period"
                onChange={(value) => setTimePeriod(value)}
            >
                {time.map((period) => {
                    return (
                        <Select.Option key={period} value={period}>
                            {period}
                        </Select.Option>
                    );
                })}
            </Select>
            <LineChart
                coinName={coin.name}
                coinHistory={coinHistory}
                currentPrice={millify(coin.price)}
            />
        </>
    );
}
export const getServerSideProps = async (context) => {
    const { coinId } = context.params;

    return {
        props: {
            coinId,
        },
    };
};
