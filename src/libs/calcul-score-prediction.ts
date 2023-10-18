import { TeamData } from "../models/team-data";

export const calculScorePrediction = ({
  teamAData,
  teamBData,
}: {
  teamAData: TeamData;
  teamBData: TeamData;
}) => {
  const averageGoalScoredByTeamA =
    teamAData.goalsScored / teamAData.numberOfGamesPlayed;
  const averageGoalTakenByTeamA =
    teamAData.goalsTaken / teamAData.numberOfGamesPlayed;

  const averageGoalScoredByTeamB =
    teamBData.goalsScored / teamBData.numberOfGamesPlayed;
  const averageGoalTakenByTeamB =
    teamBData.goalsTaken / teamBData.numberOfGamesPlayed;

  const recentFormA =
    teamAData.lastGames.filter(Boolean).length / teamAData.lastGames.length;
  const recentFormB =
    teamBData.lastGames.filter(Boolean).length / teamBData.lastGames.length;

  const goalsScoredTeamANow =
    (averageGoalScoredByTeamA + averageGoalTakenByTeamB) / 2;

  const goalsScoredTeamBNow =
    (averageGoalScoredByTeamB + averageGoalTakenByTeamA) / 2;

  let teamAScore = goalsScoredTeamANow + recentFormA * 0.75;
  let teamBScore = goalsScoredTeamBNow + recentFormB * 0.75;

  const isDraw = teamAScore / teamBScore > 0.9 && teamAScore / teamBScore < 1.0;

  if (isDraw) {
    teamAScore = Math.round((teamAScore + teamBScore) / 2);
    teamBScore = teamAScore;
  } else {
    teamAScore = Math.round(teamAScore);
    teamBScore = Math.round(teamBScore);
  }

  return {
    teamA: { name: teamAData.name, score: teamAScore },
    teamB: { name: teamBData.name, score: teamBScore },
  };
};
