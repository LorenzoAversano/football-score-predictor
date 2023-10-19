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

  const fifaRankingRatio =
    parseFloat(teamAData.fifaRankingPoints) /
    parseFloat(teamBData.fifaRankingPoints);

  if (fifaRankingRatio > 1) {
    teamAScore = teamAScore * fifaRankingRatio;
  } else if (fifaRankingRatio < 1) {
    teamBScore = teamBScore / fifaRankingRatio;
  }

  const isDraw = teamAScore / teamBScore > 0.9 && teamAScore / teamBScore < 1.0;

  if (isDraw) {
    teamAScore = Math.round((teamAScore + teamBScore) / 2);
    teamBScore = teamAScore;
  } else {
    const isAWinner = teamAScore > teamBScore;
    teamAScore = Math.round(teamAScore);
    teamBScore = Math.round(teamBScore);
    if (teamAScore === teamBScore) {
      if (isAWinner) {
        teamAScore++;
      } else {
        teamBScore++;
      }
    }
  }

  return {
    teamA: { name: teamAData.name, score: teamAScore },
    teamB: { name: teamBData.name, score: teamBScore },
  };
};
