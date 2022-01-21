import { Button, Menu, Typography, Avatar } from "antd";
import Link from "next/link";
import {
    HomeOutlined,
    MoneyCollectOutlined,
    BulbOutlined,
    FundOutlined,
} from "@ant-design/icons";
const menuItems = [
    {
        title: "home",
        link: "/",
        icon: () => <HomeOutlined />,
    },
    {
        title: "Cryptocurrencies",
        link: "/cryptocurrencies",
        icon: () => <FundOutlined />,
    },
    {
        title: "Exchanges",
        link: "/exchanges",
        icon: () => <MoneyCollectOutlined />,
    },
    {
        title: "News",
        link: "/news",
        icon: () => <BulbOutlined />,
    },
];
export default function Navbar() {
    return (
        <div className="bg-purple-800 text-white fixed left-0 h-screen w-1/4">
            <div className="p-12">
                <div className="logo-container">
                    {/* <Avatar src={icon} size="large" /> */}
                    <Typography.Title level={2} className="logo">
                        <Link href="/">
                            <a>Cryptoverse</a>
                        </Link>
                    </Typography.Title>
                    {/* <Button className="empty">

                </Button> */}
                </div>
                <Menu theme="dark">
                    {menuItems.map((item, i) => {
                        return (
                            <Menu.Item
                                key={i}
                                className="flex items-center"
                                icon={item.icon()}
                            >
                                <Link href={item.link}>
                                    <a className="px-2">{item.title}</a>
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </div>
        </div>
    );
}
