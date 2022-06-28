import Layout from "../../hoc/Layout/Layout";
import { fetchAPI } from "../../lib/api"

export async function getStaticProps() {
  const [globalData, contactData] = await Promise.all([
    fetchAPI("/global?populate=*,navbar.links"),
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
  <Layout global={global}>Contact</Layout>
);

export default Contact;
