import Layout from "../../hoc/Layout/Layout";
import { fetchAPI } from "../../lib/api";

export async function getStaticProps() {
  const [globalData, aboutData] = await Promise.all([
    fetchAPI("/global?populate=*,navbar.links"),
    fetchAPI(`/about?populate=deep`),
  ]);
  return {
    props: {
      global: globalData.data.attributes,
      aboutData,
    },
    revalidate: 1,
  };
}

const About = ({ global, aboutData }) => <Layout global={global}>About</Layout>;

export default About;
