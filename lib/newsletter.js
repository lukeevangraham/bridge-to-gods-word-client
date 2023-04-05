import axios from "axios";
import * as cheerio from "cheerio";

const campaignUrl =
  "https://us6.campaign-archive.com/home/?u=6bac04db4f991f5af4f84dabb&id=3606fc3bbc";

export const getMostRecentIssue = async () => {
  const response = await axios.get(campaignUrl);

  const $ = cheerio.load(response.data);

  console.log("HELLO");

  //   $("li.campaign").first((i, element) => {
  //     console.log("here: ", $(element).html());
  //   });

  console.log("HERE: ", $("li.campaign").first().html());

  return "howdy";
};

export const getNewsletters = async () => {
  const response = await axios.get(campaignUrl);

  let issues = [];

  const $ = cheerio.load(response.data);

  $("li.campaign").each((i, element) => {
    const date = $(element).text().split(" - ")[0];
    const url = $(element).children().attr("href");
    const title = $(element).children().attr("title");

    const dataToAdd = {
      title,
      url,
      date,
    };

    issues.push(dataToAdd);
  });

  return issues;
};
