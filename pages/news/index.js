import { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
import { useGetCryptosQuery } from "@/src/services/cryptoApi";
import { useGetNewsQuery } from "@/src/services/cryptoNewsApi";

const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
export default function NewsIndex() {
    const count = 50;
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
    const { data: cryptoNews } = useGetNewsQuery({
        newsCategory,
        count,
    });
    const { data: coinsList } = useGetCryptosQuery(count);

    // console.log({ cryptoNews });
    if (!cryptoNews?.value) return "Loading...";

    return (
        <Row gutter={[24, 24]}>
            <Col span={24}>
                <Select
                    showSearch
                    className=""
                    placeholder="select crypto"
                    optionFilterProp="children"
                    onChange={(value) => setNewsCategory(value)}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase())
                    }
                >
                    <Select.Option value="CryptoCurrecy">
                        Cryptocurrency
                    </Select.Option>
                    {coinsList?.data?.coins.map((coin) => {
                        return (
                            <Select.Option value={coin.name}>
                                {coin.name}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Col>
            {cryptoNews?.value?.map((news, i) => {
                console.log({ news });
                return (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable>
                            <Link href={news.url}>
                                <a target="_blank" rel="noreferrer">
                                    <Image
                                        src={
                                            news?.image
                                                ? news?.image.thumbnail
                                                      .contentUrl
                                                : demoImage
                                        }
                                        width={
                                            news?.image
                                                ? news?.image.thumbnail.width
                                                : 100
                                        }
                                        height={
                                            news?.image
                                                ? news?.image.thumbnail.height
                                                : 100
                                        }
                                        alt={
                                            news?.image
                                                ? news?.image.name
                                                : news.name
                                        }
                                    />
                                </a>
                            </Link>

                            <Link href={news.url}>
                                <a target="_blank" rel="noreferrer">
                                    <Typography.Title level={4}>
                                        {news.name}
                                    </Typography.Title>
                                </a>
                            </Link>
                            <p>{news.description}</p>
                            <div>
                                <div>
                                    <Avatar
                                        src={
                                            news.provider[0]?.image?.thumbnail
                                                ?.contentUrl || demoImage
                                        }
                                        alt="news"
                                    />
                                    <Typography.Text>
                                        {news.provider[0]?.name}
                                    </Typography.Text>
                                    <Typography.Text>
                                        {moment(news.datePublished)
                                            .startOf("ss")
                                            .fromNow()}
                                    </Typography.Text>
                                </div>
                            </div>
                        </Card>
                    </Col>
                );
            })}
        </Row>
    );
}
