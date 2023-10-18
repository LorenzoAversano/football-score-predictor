import puppeteer from "puppeteer";
import { TeamData } from "../models/team-data";

export const getTeamData = async (teamName: string): Promise<TeamData> => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const url = `https://www.footmercato.net/selection/${teamName}/`;

  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url);


  const teamData = await page.evaluate((name: string) => {
    const goalsScored = parseFloat(
      document.querySelector(
        "body > div.main div.blockVertical__contents > div:nth-child(1) > div > div:nth-child(3) > div.globalStatItem__value"
      )?.innerHTML
    );
    const goalsTaken = parseFloat(
      document.querySelector(
        "body > div.main div.blockVertical__contents > div:nth-child(1) > div > div:nth-child(2) > div.globalStatItem__value"
      )?.innerHTML
    );
    const numberOfGamesPlayed = parseFloat(
      document.querySelector(
        "body > div.main div.blockVertical__contents > div:nth-child(1) > div > div:nth-child(1) > div.globalStatItem__value"
      )?.innerHTML
    );

    const elements = document.querySelectorAll(
      "body > div.main > div.group.group--3 > div.group__main > div:nth-child(1) > div > div > div:nth-child(1) > a > div > .teamForm"
    );
    const lastGames: boolean[] = Array.from(elements).map(
      (element) => element.className === "teamForm teamForm--w"
    );

    return {
      name,
      goalsScored,
      goalsTaken,
      numberOfGamesPlayed,
      lastGames,
    };
  }, teamName);

  await browser.close();

  return teamData;
};
