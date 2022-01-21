import { useState, useEffect } from "react";
import Link from "next/link";
import millify from "millify";
import { Typography, Row, Col, Statistic, Card, Input } from "antd";

import { useGetCryptosQuery } from "@/src/services/cryptoApi";

export default function CryptocurrenciesIndex() {
    const count = 50;
    const { data: cryptoData, isFetching } = useGetCryptosQuery(count);
    const [coins, setCoins] = useState(cryptoData?.data?.coins);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const filteredData = cryptoData?.data?.coins.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setCoins(filteredData);
    }, [cryptoData, searchTerm]);

    if (isFetching) return "Loading ...";
    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <Typography.Title level={2}>All Cryptos</Typography.Title>
                </div>
                <div>
                    <Input
                        placeholder="Search Cryptocurrency"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <Row gutter={[12, 12]}>
                {coins?.map((coin) => {
                    console.log({ coin });
                    return (
                        <Col xs={24} sm={12} lg={6} key={coin.uuid}>
                            <Link href={`/cryptocurrencies/${coin.uuid}`}>
                                <a>
                                    <Card
                                        title={`${coin.rank}. ${coin.name}`}
                                        extra={
                                            <img
                                                width="20"
                                                className=""
                                                src={coin.iconUrl}
                                            />
                                        }
                                        hoverable
                                    >
                                        <p>Price: {millify(coin.price)}</p>
                                        <p>
                                            Market Cap:{" "}
                                            {millify(coin.marketCap)}
                                        </p>
                                        <p>
                                            Daily change: {millify(coin.change)}
                                        </p>
                                    </Card>
                                </a>
                            </Link>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}
