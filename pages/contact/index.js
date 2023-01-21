import Layout from "../../hoc/Layout/Layout";
import Breadcrumb from "../../components/UI/Breadcrumb/Breadcrumb";
import { fetchAPI } from "../../lib/api"

export async function getStaticProps() {
  const [globalData, contactData] = await Promise.all([
    fetchAPI("/global?populate=*,navbar.links,navbar.Button"),
    fetchAPI(`/contact?populate=deep`),
  ]);
  return {
    props: {
      global: globalData.data.attributes,
      contactData,
    },
    revalidate: 1,
  };
}

const Contact = ({ global, contactData }) => (
  <Layout global={global}>
    <Breadcrumb title="Contact" bgImage={"https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1674277225/amador_loureiro_B_Vy_Nlch_Wqzs_unsplash_bd31f5f21c.jpg?updated_at=2023-01-21T05:00:30.095Z"} />
    <div>Contact</div>
  </Layout>
);

export default Contact;
