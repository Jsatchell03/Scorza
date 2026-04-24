export type Sport =
  | "Football"
  | "Basketball"
  | "American Football"
  | "Baseball"
  | "Rugby";

export type FixtureStatus = "live" | "upcoming" | "past";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  sport: Sport;
  leagueId: string;
  color: string;
  badge_url?: string;
}

export interface League {
  id: string;
  name: string;
  sport: Sport;
  country: string;
  color: string;
  badge_url?: string;
}

export interface PendingUpdate {
  id: string;
  fixtureId: string;
  proposedHomeScore: number;
  proposedAwayScore: number;
  timestamp: number;
}

export interface Fixture {
  id: string;
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  status: FixtureStatus;
  startTime: number;
  venue?: string;
  homeScore: number;
  awayScore: number;
  period?: string;
  pendingUpdates: PendingUpdate[];
}

export type RootStackParamList = {
  Tabs: undefined;
  FixtureInfo: { fixtureId: string };
  TeamInfo: { teamId: string };
  LeagueInfo: { leagueId: string };
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Account: undefined;
};
