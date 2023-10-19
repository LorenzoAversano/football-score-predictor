import { predictScore } from "../src/index";

test("Prediction", async () => {
  const result = await predictScore({
    teamA: "France",
    teamB: "Allemagne",
  });
  expect(result).toEqual({
    teamA: { name: "France", score: expect.any(Number) },
    teamB: { name: "Allemagne", score: expect.any(Number) },
  });
}, 30000);
