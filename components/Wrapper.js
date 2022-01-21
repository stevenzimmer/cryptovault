import Navbar from "@/components/Navbar";
import { Layout } from "antd";
export default function Wrapper({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex ">
                <div className="lg:w-1/4"></div>
                <div className="w-3/4">
                    <Layout>
                        <div className="routes p-12">{children}</div>
                    </Layout>
                </div>
            </div>
        </>
    );
}
