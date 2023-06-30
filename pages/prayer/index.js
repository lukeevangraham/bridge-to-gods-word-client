import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import { fetchAPI, getGlobalInfo } from "../../lib/api";

export async function getStaticProps() {
  const [globalData] = await Promise.all([getGlobalInfo()]);

  return {
    props: {
      global: globalData.data.attributes,
    },
    revalidate: 1,
  };
}

const Prayer = ({ global }) => (
  <Layout global={global}>
    <>
    <Breadcrumb title="Prayer Points" bgImage="https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1688167876/jon_tyson_0o9dgx_Eu5_Q_unsplash_8dfc45fafd.jpg?updated_at=2023-06-30T23:31:20.594Z" />
    </>
    <div>Prayer</div>;
  </Layout>
);

export default Prayer;
