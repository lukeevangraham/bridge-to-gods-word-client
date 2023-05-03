import qs from "qs";

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
  const response = await fetchAPI("/blogs?pagination[pageSize]=9999");

  return response.data.map((blog) => {
    return {
      params: {
        slug: blog.attributes.slug,
      },
    };
  });
}

export async function getAllBlogPages() {
  const response = await fetchAPI("/blogs");

  let pageArray = [];

  for (let index = 0; index < response.meta.pagination.pageCount; index++) {
    pageArray.push((index + 1).toString());
  }

  return pageArray.map((page) => {
    return {
      params: {
        page: page,
      },
    };
  });
}

export async function getBlogPageSnippets(page) {
  const snippetQuery = qs.stringify({
    sort: ["DatePosted:desc"],
    populate: "*",
    pagination: { page: page, pageSize: 24 },
  });
  const response = await fetchAPI(`/blogs?${snippetQuery}`);

  response.data.forEach((entry) => {
    entry.attributes.Body = entry.attributes.Body.substring(0, 100);
    return entry;
  });

  // console.log("TRUN: ", truncatedRes);

  return response;
}

// GETTING GLOBAL INFO
export async function getGlobalInfo() {
  const navQuery = qs.stringify({
    populate: { navbar: { populate: "*" } },
  });

  return fetchAPI(`/global?${navQuery}`);
}
