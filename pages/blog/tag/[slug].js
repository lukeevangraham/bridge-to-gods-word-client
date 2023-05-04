import { fetchAPI, getGlobalInfo, getAllBlogTags } from "../../../lib/api";
import Layout from "../../../hoc/Layout/Layout";
import Breadcrumb from "../../../components/UI/Breadcrumb/Breadcrumb";
import BlogPage from "../../../components/Blog/BlogPage/BlogPage";
import { useRouter } from "next/router";

import classes from "./slug.module.scss";

export async function getStaticPaths() {
  const paths = await getAllBlogTags();

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [tagData, global] = await Promise.all([
    fetchAPI(
      `/blogs?filters[blog_topics][Topic][$contains]=${params.slug}&populate=*`
    ),
    getGlobalInfo(),
  ]);
  return {
    props: {
      blogData: tagData,
      global: global.data.attributes,
      slug: params.slug,
    },
    revalidate: 1,
  };
}

const Tag = ({ blogData, global, slug }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout global={global}>
      <>
        <Breadcrumb
          title={`Topic: ${slug}`}
          parent={"blog"}
          bgImage={
            "https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1675636015/aaron_burden_x_G8_IQ_Mq_MITM_unsplash_3d9571db8a.jpg?updated_at=2023-02-05T22:26:59.780Z"
          }
        />
        <BlogPage newsData={blogData} />
      </>
    </Layout>
  );
};

export default Tag;
