import { getTeamData } from "./libs/get-team-data";
import { calculScorePrediction } from "./libs/calcul-score-prediction";
export const predictScore = async ({
  teamA,
  teamB,
}: {
  teamA: string;
  teamB: string;
}) => {
  const teamAData = await getTeamData(teamA);
  const teamBData = await getTeamData(teamB);
  const scorePrediction = calculScorePrediction({
    teamAData,
    teamBData,
  });
  return scorePrediction;
};

// example
// predictScore({
//   teamA: "Malte",
//   teamB: "Espagne",
// }).then((scorePrediction) => console.log(scorePrediction));
