import { calculScorePrediction } from "../../src/libs/calcul-score-prediction";
import { TeamData } from "../../src/models/team-data";

const getMockedTeamWinner = (teamName: string): TeamData => {
  const mockTeamWinner: TeamData = {
    name: teamName,
    goalsScored: 10,
    goalsTaken: 5,
    numberOfGamesPlayed: 5,
    lastGames: [true, true, false, true, true],
    fifaRankingPoints: "100",
  };
  return mockTeamWinner;
};

const getMockedTeamLooser = (teamName: string): TeamData => {
  const mockTeamLooser: TeamData = {
    name: teamName,
    goalsScored: 8,
    goalsTaken: 4,
    numberOfGamesPlayed: 4,
    lastGames: [true, true, false, false],
    fifaRankingPoints: "90",
  };
  return mockTeamLooser;
};

const getMockedTeamDraw = (teamName: string): TeamData => {
  const mockTeamDraw: TeamData = {
    name: teamName,
    goalsScored: 10,
    goalsTaken: 5,
    numberOfGamesPlayed: 5,
    lastGames: [true, true, false, true, true],
    fifaRankingPoints: "100",
  };
  return mockTeamDraw;
};

test("Team A should win", () => {
  const mockTeamA = getMockedTeamWinner("A");
  const mockTeamB = getMockedTeamLooser("B");

  const result = calculScorePrediction({
    teamAData: mockTeamA,
    teamBData: mockTeamB,
  });
  expect(result).toEqual({
    teamA: { name: "A", score: expect.any(Number) },
    teamB: { name: "B", score: expect.any(Number) },
  });
  expect(result.teamA.score).toBeGreaterThan(result.teamB.score);
});

test("Team B should win", () => {
  const mockTeamA = getMockedTeamLooser("A");

  const mockTeamB = getMockedTeamWinner("B");

  const result = calculScorePrediction({
    teamAData: mockTeamA,
    teamBData: mockTeamB,
  });
  expect(result).toEqual({
    teamA: { name: "A", score: expect.any(Number) },
    teamB: { name: "B", score: expect.any(Number) },
  });
  expect(result.teamB.score).toBeGreaterThan(result.teamA.score);
});

test("Teams should draw", () => {
  const mockTeamA = getMockedTeamDraw("A");

  const mockTeamB = getMockedTeamDraw("B");

  const result = calculScorePrediction({
    teamAData: mockTeamA,
    teamBData: mockTeamB,
  });
  expect(result).toEqual({
    teamA: { name: "A", score: expect.any(Number) },
    teamB: { name: "B", score: expect.any(Number) },
  });
  expect(result.teamA.score).toEqual(result.teamB.score);
});
