import { getTeamData } from "./libs/get-team-data";
import { calculScorePrediction } from "./libs/calcul-score-prediction";
export const predictScore = async ({
  teamA,
  teamB,
  simlulationCount,
}: {
  teamA: string;
  teamB: string;
  simlulationCount: number;
}) => {
  //TODO: implement
  console.log({ teamA, teamB, simlulationCount });
  const teamAData = await getTeamData(teamA);
  const teamBData = await getTeamData(teamB);
  const scorePrediction = calculScorePrediction({
    teamAData,
    teamBData,
    simlulationCount,
  });
  return scorePrediction;

};


predictScore({
  teamA: "Malte",
  teamB: "Espagne",
  simlulationCount: 100,
})