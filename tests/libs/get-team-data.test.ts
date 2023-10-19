import {
  getTeamData,
  getFootMercatoData,
  getFifaRankingPoints,
} from "../../src/libs/get-team-data";
import puppeteer, { Page, Browser } from "puppeteer";

const getPage = async (): Promise<{ page: Page; browser: Browser }> => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  return { page, browser };
};

test("getTeamData should return team data", async () => {
  const teamData = await getTeamData("France");
  expect(teamData).toEqual({
    name: "France",
    goalsScored: expect.any(Number),
    goalsTaken: expect.any(Number),
    numberOfGamesPlayed: expect.any(Number),
    lastGames: expect.any(Array),
    fifaRankingPoints: expect.any(String),
  });
}, 20000);

test("getFootMercatoData should return team data", async () => {
  const { page, browser } = await getPage();
  const teamData = await getFootMercatoData("France", page);
  expect(teamData).toEqual({
    name: "France",
    goalsScored: expect.any(Number),
    goalsTaken: expect.any(Number),
    numberOfGamesPlayed: expect.any(Number),
    lastGames: expect.any(Array),
  });
  await browser.close();
}, 20000);

test("getFifaRankingPoints should return team data", async () => {
  const { page, browser } = await getPage();
  const teamData = await getFifaRankingPoints("France", page);
  expect(teamData).toEqual(expect.any(String));
  await browser.close();
}, 20000);
