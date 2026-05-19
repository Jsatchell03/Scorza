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
    badge_url:
      "https://storage.googleapis.com/scorza-provider-assets/english_premier_league_badge.png",
  },
  {id: "l_ncr", name: "National Collegiate Rugby", sport: "Rugby", country: "USA", color:"#2c9842", badge_url:"https://cdn.prod.website-files.com/634d92e873a503490ca604f3/634de4a7f814305598471653_Logo%20-%20Full%20Color.png"}
];

export const teams: Team[] = [
  
  {
    id: "t_ars",
    name: "Arsenal",
    shortName: "ARS",
    sport: "Football",
    leagueId: "l_epl",
    color: "#EF0107",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/arsenal_badge.png"
  },
  {
    id: "t_avl",
    name: "Aston Villa",
    shortName: "AVL",
    sport: "Football",
    leagueId: "l_epl",
    color: "#670E36",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/aston_villa_badge.png"
  },
  {
    id: "t_bou",
    name: "Bournemouth",
    shortName: "BOU",
    sport: "Football",
    leagueId: "l_epl",
    color: "#DA291C",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/bournemouth_badge.png"
  },
  {
    id: "t_bre",
    name: "Brentford",
    shortName: "BRE",
    sport: "Football",
    leagueId: "l_epl",
    color: "#E30613",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/brentford_badge.png"
  },
  {
    id: "t_bha",
    name: "Brighton",
    shortName: "BHA",
    sport: "Football",
    leagueId: "l_epl",
    color: "#0057B8",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/brighton_and_hove_albion_badge.png"
  },
  {
    id: "t_bur",
    name: "Burnley",
    shortName: "BUR",
    sport: "Football",
    leagueId: "l_epl",
    color: "#6C1D45",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/burnley_badge.png"
  },
  {
    id: "t_che",
    name: "Chelsea",
    shortName: "CHE",
    sport: "Football",
    leagueId: "l_epl",
    color: "#034694",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/chelsea_badge.png"
  },
  {
    id: "t_cry",
    name: "Crystal Palace",
    shortName: "CRY",
    sport: "Football",
    leagueId: "l_epl",
    color: "#1B458F",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/crystal_palace_badge.png"
  },
  {
    id: "t_eve",
    name: "Everton",
    shortName: "EVE",
    sport: "Football",
    leagueId: "l_epl",
    color: "#003399",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/everton_badge.png"
  },
  {
    id: "t_ful",
    name: "Fulham",
    shortName: "FUL",
    sport: "Football",
    leagueId: "l_epl",
    color: "#1D1D1D",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/fulham_badge.png"
  },
  {
    id: "t_lee",
    name: "Leeds",
    shortName: "LEE",
    sport: "Football",
    leagueId: "l_epl",
    color: "#FFCD00",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/leeds_united_badge.png"
  },
  {
    id: "t_liv",
    name: "Liverpool",
    shortName: "LIV",
    sport: "Football",
    leagueId: "l_epl",
    color: "#C8102E",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/liverpool_badge.png"
  },
  {
    id: "t_mci",
    name: "Manchester City",
    shortName: "MCI",
    sport: "Football",
    leagueId: "l_epl",
    color: "#6CABDD",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/manchester_city_badge.png"
  },
  {
    id: "t_mun",
    name: "Manchester United",
    shortName: "MUN",
    sport: "Football",
    leagueId: "l_epl",
    color: "#DA291C",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/manchester_united_badge.png"
  },
  {
    id: "t_new",
    name: "Newcastle",
    shortName: "NEW",
    sport: "Football",
    leagueId: "l_epl",
    color: "#241F20",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/newcastle_united_badge.png"
  },
  {
    id: "t_nfo",
    name: "Nottingham Forest",
    shortName: "NFO",
    sport: "Football",
    leagueId: "l_epl",
    color: "#DD0000",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/nottingham_forest_badge.png"
  },
  {
    id: "t_sun",
    name: "Sunderland",
    shortName: "SUN",
    sport: "Football",
    leagueId: "l_epl",
    color: "#EB172B",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/sunderland_badge.png"
  },
  {
    id: "t_tot",
    name: "Tottenham",
    shortName: "TOT",
    sport: "Football",
    leagueId: "l_epl",
    color: "#132257",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/tottenham_hotspur_badge.png"
  },
  {
    id: "t_whu",
    name: "West Ham",
    shortName: "WHU",
    sport: "Football",
    leagueId: "l_epl",
    color: "#7A263A",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/west_ham_united_badge.png"
  },
  {
    id: "t_wol",
    name: "Wolves",
    shortName: "WOL",
    sport: "Football",
    leagueId: "l_epl",
    color: "#FDB913",
    badge_url: "https://storage.googleapis.com/scorza-provider-assets/wolverhampton_wanderers_badge.png"
  },
  {
    id: "t_lrf",
    name: "Loyola Rugby Football Club",
    shortName: "LRF",
    sport: "Rugby",
    leagueId: "l_ncr",
    color: "#5A0722",
  },
  {
    id: "t_nrfc",
    name: "Northwestern Rugby Club",
    shortName: "NR",
    sport:"Rugby",
    leagueId: "l_ncr",
     color:"#4E2A84"
    },
  {
    id: "t_ucrf",
    name: "UChicago Rugby Club",
    shortName: "UCR",
    sport: "Rugby",
    leagueId: "l_ncr",
    color: "#800000",
  },{
    id: "t_uicrf",
    name: "UIC Rugby Club",
    shortName: "UICR",
    sport: "Rugby",
    leagueId: "l_ncr",
    color: "#D50032",
  }

];

export const initialFixtures: Fixture[] = [
  {
    id: "f_live_1",
    leagueId: "l_ncr",
    homeTeamId: "t_uicrf",
    awayTeamId: "t_ucrf",
    status: "live",
    startTime: NOW - 68 * 60 * 1000,
    venue: "Soldier Field",
    homeScore: 15,
    awayScore: 21,
    period: "2nd Half",
    pendingUpdates: [
      {
        id: "p_1",
        fixtureId: "f_live_1",
        proposedHomeScore: 18,
        proposedAwayScore: 21,
        timestamp: NOW - 2 * 60 * 1000,
      },
      
    ],
  },
  {
    id: "f_live_2",
    leagueId: "l_epl",
    homeTeamId: "t_liv",
    awayTeamId: "t_che",
    status: "live",
    startTime: NOW - 35 * 60 * 1000,
    venue: "Anfield",
    homeScore: 2,
    awayScore: 0,
    period: "1st Half",
    pendingUpdates: [],
  },
  {
    id: "f_up_1",
    leagueId: "l_epl",
    homeTeamId: "t_mun",
    awayTeamId: "t_tot",
    status: "upcoming",
    startTime: NOW + 1 * DAY + 4 * HOUR,
    venue: "Old Trafford",
    homeScore: 0,
    awayScore: 0,
    pendingUpdates: [],
  },
  {
    id: "f_up_2",
    leagueId: "l_epl",
    homeTeamId: "t_new",
    awayTeamId: "t_bha",
    status: "upcoming",
    startTime: NOW + 3 * DAY,
    venue: "St James' Park",
    homeScore: 0,
    awayScore: 0,
    pendingUpdates: [],
  },
  {
    id: "f_up_3",
    leagueId: "l_epl",
    homeTeamId: "t_avl",
    awayTeamId: "t_whu",
    status: "upcoming",
    startTime: NOW + 5 * DAY,
    venue: "Villa Park",
    homeScore: 0,
    awayScore: 0,
    pendingUpdates: [],
  },
  {
    id: "f_up_4",
    leagueId: "l_epl",
    homeTeamId: "t_bre",
    awayTeamId: "t_cry",
    status: "upcoming",
    startTime: NOW + 7 * DAY,
    venue: "Gtech Community Stadium",
    homeScore: 0,
    awayScore: 0,
    pendingUpdates: [],
  },
  {
    id: "f_past_1",
    leagueId: "l_epl",
    homeTeamId: "t_nfo",
    awayTeamId: "t_wol",
    status: "past",
    startTime: NOW - 2 * DAY,
    venue: "The City Ground",
    homeScore: 2,
    awayScore: 1,
    pendingUpdates: [],
  },
  {
    id: "f_past_2",
    leagueId: "l_epl",
    homeTeamId: "t_bou",
    awayTeamId: "t_eve",
    status: "past",
    startTime: NOW - 5 * DAY,
    venue: "Vitality Stadium",
    homeScore: 1,
    awayScore: 1,
    pendingUpdates: [],
  },
  {
    id: "f_past_3",
    leagueId: "l_epl",
    homeTeamId: "t_bur",
    awayTeamId: "t_ful",
    status: "past",
    startTime: NOW - 9 * DAY,
    venue: "Turf Moor",
    homeScore: 0,
    awayScore: 2,
    pendingUpdates: [],
  },
  {
    id: "f_past_4",
    leagueId: "l_epl",
    homeTeamId: "t_lee",
    awayTeamId: "t_sun",
    status: "past",
    startTime: NOW - 14 * DAY,
    venue: "Elland Road",
    homeScore: 3,
    awayScore: 1,
    pendingUpdates: [],
  },
  {
    id: "f_ncr_past_1",
    leagueId: "l_ncr",
    homeTeamId: "t_nrfc",
    awayTeamId: "t_lrf",
    status: "past",
    startTime: NOW - 3 * DAY,
    venue: "Lakeside Field, Evanston",
    homeScore: 24,
    awayScore: 37,
    pendingUpdates: [],
  },
  {
    id: "f_ncr_past_3",
    leagueId: "l_ncr",
    homeTeamId: "t_lrf",
    awayTeamId: "t_ucrf",
    status: "past",
    startTime: NOW - 17 * DAY,
    venue: "Loyola Sports Complex, Chicago",
    homeScore: 28,
    awayScore: 19,
    pendingUpdates: [],
  },
  {
    id: "f_ncr_up_1",
    leagueId: "l_ncr",
    homeTeamId: "t_uicrf",
    awayTeamId: "t_nrfc",
    status: "upcoming",
    startTime: NOW + 3 * DAY + 2 * HOUR,
    venue: "Flames Field, Chicago",
    homeScore: 0,
    awayScore: 0,
    pendingUpdates: [],
  },
  {
    id: "f_ncr_up_2",
    leagueId: "l_ncr",
    homeTeamId: "t_lrf",
    awayTeamId: "t_uicrf",
    status: "upcoming",
    startTime: NOW + 10 * DAY + 2 * HOUR,
    venue: "Loyola Sports Complex, Chicago",
    homeScore: 0,
    awayScore: 0,
    pendingUpdates: [],
  },
  {
    id: "f_ncr_up_3",
    leagueId: "l_ncr",
    homeTeamId: "t_nrfc",
    awayTeamId: "t_ucrf",
    status: "upcoming",
    startTime: NOW + 17 * DAY + 2 * HOUR,
    venue: "Lakeside Field, Evanston",
    homeScore: 0,
    awayScore: 0,
    pendingUpdates: [],
  },
];

export const getTeamById = (id: string) => teams.find((t) => t.id === id);
export const getLeagueById = (id: string) => leagues.find((l) => l.id === id);
