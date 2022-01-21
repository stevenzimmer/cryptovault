import "@/styles/globals.css";
import Wrapper from "@/components/Wrapper";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "@/src/app/store";
function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Wrapper>
                <Component {...pageProps} />
            </Wrapper>
        </Provider>
    );
}

export default MyApp;
