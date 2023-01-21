import Layout from "../../hoc/Layout/Layout";
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
  <Layout global={global}>Give</Layout>
);

export default Contact;
