import axios from "axios";
import * as cheerio from "cheerio";

const campaignUrl =
  "https://us6.campaign-archive.com/home/?u=6bac04db4f991f5af4f84dabb&id=3606fc3bbc";

export const getMostRecentIssue = async () => {
  const response = await axios.get(campaignUrl);

  let $ = cheerio.load(response.data);

  //   $("li.campaign").first((i, element) => {
  //     console.log("here: ", $(element).html());
  //   });

  const recentNewsDate = $("li.campaign").first().text().split(" - ")[0];
  const recentNewsUrl = $("li.campaign").first().children("a").attr("href");

  console.log("HERE: ", $("li.campaign").first().text().split(" - ")[0]);

  const topCampaign = await axios.get(recentNewsUrl);

  $ = cheerio.load(topCampaign.data);

  const recentNewsletter = {
    topImage: $("#templateBody").find("img:first").attr("src"),
    firstH1: $("#templateBody").find("h1:first").text(),
    secondText: $("#templateBody").find("td.mcnTextContent:eq(2)").text(),
    date: recentNewsDate,
    url: recentNewsUrl,
  };

  return recentNewsletter;
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
