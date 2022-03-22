import "../styles/globals.css";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "./../src/store/index";
import Layout from "../src/components/layout/Layout";

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  return (
    <PersistGate persistor={store.__persistor} loading={<div>loading</div>}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
