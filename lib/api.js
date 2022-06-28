export const getStrapiURL = (path = "") => {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL ||
    "https://bridgeadmin.grahamwebworks.com/api"
  }${path}`;
};

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export async function getAllBlogSlugs() {
  const response = await fetchAPI("/blogs");

  console.log("RES: ", response)

  return response.data.map((blog) => {
    console.log(`HERE: ${blog.attributes.slug}`)
    return {
      params: {
        slug: blog.attributes.slug,
      },
    };
  });
}
