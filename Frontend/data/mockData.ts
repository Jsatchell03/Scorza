import { Fixture, League, Team } from "../types";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const NOW = Date.now();

export const leagues: League[] = [
  {
    id: "l_epl",
    name: "Premier League",
    sport: "Football",
    country: "England",
    color: "#3D195B",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/english_premier_league_badge.png"
  },
  {id: "l_ncr", name: "National Colligiate Rugby", sport: "Rugby", country: "USA", color:"#2c9842", badge_url:"https://cdn.prod.website-files.com/634d92e873a503490ca604f3/634de4a7f814305598471653_Logo%20-%20Full%20Color.png"}
];

export const teams: Team[] = [
  {
    id: "t_ars",
    name: "Arsenal",
    shortName: "ARS",
    sport: "Football",
    leagueId: "l_epl",
    color: "#EF0107",
  },
  {
    id: "t_liv",
    name: "Liverpool",
    shortName: "LIV",
    sport: "Football",
    leagueId: "l_epl",
    color: "#C8102E",
  },
  {
    id: "t_mci",
    name: "Man City",
    shortName: "MCI",
    sport: "Football",
    leagueId: "l_epl",
    color: "#6CABDD",
  },
  {
    id: "t_che",
    name: "Chelsea",
    shortName: "CHE",
    sport: "Football",
    leagueId: "l_epl",
    color: "#034694",
  },
];

export const initialFixtures: Fixture[] = [
  {
    id: "f_live_1",
    leagueId: "l_epl",
    homeTeamId: "t_ars",
    awayTeamId: "t_liv",
    status: "live",
    startTime: NOW - 40 * 60 * 1000,
    venue: "Emirates Stadium",
    homeScore: 1,
    awayScore: 0,
    period: "1st Half · 38'",
    pendingUpdates: [
      {
        id: "p_1",
        fixtureId: "f_live_1",
        proposedHomeScore: 2,
        proposedAwayScore: 0,
        timestamp: NOW - 90 * 1000,
      },
      {
        id: "p_2",
        fixtureId: "f_live_1",
        proposedHomeScore: 1,
        proposedAwayScore: 1,
        timestamp: NOW - 30 * 1000,
      },
    ],
  },
  {
    id: "f_up_2",
    leagueId: "l_epl",
    homeTeamId: "t_mci",
    awayTeamId: "t_che",
    status: "upcoming",
    startTime: NOW + 2 * DAY + 5 * HOUR,
    venue: "Etihad Stadium",
    homeScore: 0,
    awayScore: 0,
    pendingUpdates: [],
  },
  {
    id: "f_past_2",
    leagueId: "l_epl",
    homeTeamId: "t_liv",
    awayTeamId: "t_che",
    status: "past",
    startTime: NOW - 4 * DAY,
    venue: "Anfield",
    homeScore: 2,
    awayScore: 2,
    pendingUpdates: [],
  },
];

export const getTeamById = (id: string) => teams.find((t) => t.id === id);
export const getLeagueById = (id: string) => leagues.find((l) => l.id === id);
