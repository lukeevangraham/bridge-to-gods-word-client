import { getAllBlogPages, fetchAPI, getGlobalInfo, getBlogPageSnippets } from "../../../lib/api";
import Layout from "../../../hoc/Layout/Layout";
import Breadcrumb from "../../../components/UI/Breadcrumb/Breadcrumb";
import { useRouter } from "next/router";
import BlogPage from "../../../components/Blog/BlogPage/BlogPage";

export async function getStaticPaths() {
  const paths = await getAllBlogPages();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [newsPageData, globalData] = await Promise.all([
    // fetchAPI(
    //   `/blogs?sort=DatePosted:desc&populate=deep&pagination[page]=${params.page}`
    // ),
    getBlogPageSnippets(params.page),
    getGlobalInfo(),
  ]);

  return {
    props: {
      global: globalData.data.attributes,
      newsPageData,
    },
    revalidate: 1,
  };
}

const BlogPageRoute = ({ newsPageData, global }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout global={global}>
        <Breadcrumb
          title="Blog"
          bgImage="https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1675636015/aaron_burden_x_G8_IQ_Mq_MITM_unsplash_3d9571db8a.jpg?updated_at=2023-02-05T22:26:59.780Z"
        />
        <BlogPage newsData={newsPageData} />
      </Layout>
    </>
  );
};

export default BlogPageRoute;
