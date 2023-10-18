import puppeteer from 'puppeteer';


type TeamData = {
  averageGoalScoredByMatch: number;
  averageGoalTakenByMatch: number;
  numberOfGamesPlayed: number;
  last5Games: boolean[];
}

export const getTeamData = async (teamName: string): Promise<TeamData> => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const url = `https://www.footmercato.net/selection/${teamName}/`;

  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(url);

  const teamData: TeamData = await page.evaluate((teamName) => {
    const name = teamName;
    const goalScoredByMatch = parseFloat(document.querySelector('body > div.main > div.group.group--3 > div.group__main > div:nth-child(5) > div.blockVertical__contents > div:nth-child(1) > div > div:nth-child(3) > div.globalStatItem__value')?.innerHTML);
    const goalTakenByMatch = parseFloat(document.querySelector('body > div.main > div.group.group--3 > div.group__main > div:nth-child(5) > div.blockVertical__contents > div:nth-child(1) > div > div:nth-child(2) > div.globalStatItem__value')?.innerHTML);
    const numberOfGamesPlayed = parseFloat(document.querySelector('body > div.main > div.group.group--3 > div.group__main > div:nth-child(5) > div.blockVertical__contents > div:nth-child(1) > div > div:nth-child(1) > div.globalStatItem__value')?.innerHTML);

    const averageGoalScoredByMatch = Number((goalScoredByMatch / numberOfGamesPlayed).toFixed(2));
    const averageGoalTakenByMatch = Number((goalTakenByMatch / numberOfGamesPlayed).toFixed(2));

    const elements = document.querySelectorAll('body > div.main > div.group.group--3 > div.group__main > div:nth-child(1) > div > div > div:nth-child(1) > a > div > .teamForm');
    const last5Games: boolean[] = Array.from(elements).map((element) => element.className === 'teamForm teamForm--w');

    return {
      name,
      averageGoalScoredByMatch,
      averageGoalTakenByMatch,
      numberOfGamesPlayed,
      last5Games,
    }
  }, teamName);

  await browser.close();

  return teamData;
};








