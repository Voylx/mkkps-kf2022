import "../styles/globals.css";
import "../styles/line.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppWrapper } from "@/context/AppContext";
import { Header } from "components/Header";

function MyApp({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Header />
            <Component {...pageProps} />
        </AppWrapper>
    );
}

export default MyApp;

