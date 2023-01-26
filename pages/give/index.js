import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import { fetchAPI } from "../../lib/api"

export async function getStaticProps() {
  const [globalData, giveData] = await Promise.all([
    fetchAPI("/global?populate=*,navbar.links,navbar.Button"),
    fetchAPI(`/give?populate=deep`),
  ]);
  return {
    props: {
      global: globalData.data.attributes,
      giveData,
    },
    revalidate: 1,
  };
}

const Contact = ({ global, giveData }) => (
  <Layout global={global}>
    <Breadcrumb title="Give" bgImage={"https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1674277522/milada_vigerova_i_Q_Wv_VY_Mtv1k_unsplash_aec10749b6.jpg?updated_at=2023-01-21T05:05:26.450Z"} />
    <main>Give</main>
  </Layout>
);

export default Contact;
