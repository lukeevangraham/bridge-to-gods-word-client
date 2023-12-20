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

  const topCampaign = await axios.get(recentNewsUrl);

  $ = cheerio.load(topCampaign.data);

  let recentNewsletter = {
    topImage:
      "https://res.cloudinary.com/bridge-to-god-s-word/image/upload/v1674264828/maksim_shutov_kd_L_Kidl6_Lrc_unsplash_9f846d115f.jpg?updated_at=2023-01-21T01:33:53.290Z",
    firstH1: "News from Carla Unseth",
    secondText:
      "The latest newsletter from Carla can be viewed by clicking on the title above",
    date: recentNewsDate,
    url: recentNewsUrl,
  };

  // REPLACE NEWSLETTER IMAGE IF PARSED
  $("#templateBody").find("img:first").attr("src")
    ? (recentNewsletter.topImage = $("#templateBody")
        .find("img:first")
        .attr("src"))
    : null;

  // REPLACE NEWSLETTER TITLE IF PARSED
  $("#templateBody").find("h1:first").text()
    ? (recentNewsletter.firstH1 = $("#templateBody").find("h1:first").text())
    : $("#templateBody").find("h2:first").text()
    ? (recentNewsletter.firstH1 = $("#templateBody").find("h2:first").text())
    : $("#templateBody").find("h3:first").text()
    ? (recentNewsletter.firstH1 = $("#templateBody").find("h3:first").text())
    : null;

  // REPLACE NEWSLETTER BODY IF PARSED
  $("#templateBody").find("td.mcnTextContent:eq(2)").html()
    ? (recentNewsletter.secondText = $("#templateBody")
        .find("td.mcnTextContent:eq(2)")
        .html()
        .replace(/<(.|\n)*?>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim()
        .replace(/\s+/g, " ")
        .split(/(?=\s)/gi)
        .slice(0, 33)
        .join(""))
    : $("#templateBody").find("td.mcnTextContent:eq(1)").html()
    ? (recentNewsletter.secondText = $("#templateBody")
        .find("td.mcnTextContent:eq(1)")
        .html()
        .replace(/<(.|\n)*?>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim()
        .replace(/\s+/g, " ")
        .split(/(?=\s)/gi)
        .slice(0, 33)
        .join(""))
    : null;

  // const recentNewsletterOLD = {
  //   topImage: $("#templateBody").find("img:first").attr("src"),
  //   firstH1: $("#templateBody").find("h1:first").text(),
  //   secondText: $("#templateBody")
  //     .find("td.mcnTextContent:eq(2)")
  //     .html()
  //     .replace(/<(.|\n)*?>/g, "")
  //     .replace(/&nbsp;/g, " ")
  //     .trim()
  //     .replace(/\s+/g, " ")
  //     .split(/(?=\s)/gi)
  //     .slice(0, 33)
  //     .join(""),
  //   date: recentNewsDate,
  //   url: recentNewsUrl,
  // };

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
