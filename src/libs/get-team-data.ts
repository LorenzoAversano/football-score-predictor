import puppeteer, { Page } from "puppeteer";
import { TeamData } from "../models/team-data";

type TeamDataFootMercato = {
  name: string;
  goalsScored: number;
  goalsTaken: number;
  numberOfGamesPlayed: number;
  lastGames: boolean[];
};

export const getFootMercatoData = async (
  teamName: string,
  page: Page
): Promise<TeamDataFootMercato> => {
  const urlTeamData = `https://www.footmercato.net/selection/${teamName}/`;

  await page.goto(urlTeamData);

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

  return teamData;
};

export const getFifaRankingPoints = async (
  teamName: string,
  page: Page
): Promise<string> => {
  const urlFifaRanking = `https://www.fifa.com/fr/fifa-world-ranking/men/`;

  await page.goto(urlFifaRanking);

  let fifaRanking = "Pays non trouvé";

  while (fifaRanking === "Pays non trouvé") {
    const rows = await page.$$("tr.row_rankingTableFullRow__Y_A4i");

    for (const row of rows) {
      const pays = await row.$("span.d-none.d-lg-block");
      const paysText = await page.evaluate((p) => p.textContent, pays);

      if (paysText.toLowerCase() === teamName.toLowerCase()) {
        const indice = await row.$("div.d-flex.ff-mr-16");
        fifaRanking = await page.evaluate((i) => i.textContent, indice);
        break;
      }
    }

    if (fifaRanking === "Pays non trouvé") {
      const nextPageButton = await page.$(
        "#content > main > section.ff-pt-64.ff-pb-32.ff-bg-grey-lightest > div > div > div.ff-mt-64 > div > div > div > div > div.ff-ml-16 > button"
      );
      if (nextPageButton) {
        await nextPageButton.click();
      } else {
        break;
      }
    }
  }

  return fifaRanking;
};

export const getTeamData = async (teamName: string): Promise<TeamData> => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const teamDataFootMercato = await getFootMercatoData(teamName, page);
  const fifaRankingPoints = await getFifaRankingPoints(teamName, page);
  await browser.close();

  return {
    ...teamDataFootMercato,
    fifaRankingPoints,
  };
};
