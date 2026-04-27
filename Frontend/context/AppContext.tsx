import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Fixture, PendingUpdate } from "../types";
import { initialFixtures } from "../data/mockData";

interface AppContextValue {
  fixtures: Fixture[];
  followedTeamIds: Set<string>;
  followedLeagueIds: Set<string>;
  getFixtureById: (id: string) => Fixture | undefined;
  addPendingUpdate: (
    fixtureId: string,
    proposedHomeScore: number,
    proposedAwayScore: number
  ) => void;
  confirmPendingUpdate: (fixtureId: string, updateId: string) => void;
  dismissPendingUpdate: (fixtureId: string, updateId: string) => void;
  toggleFollowTeam: (teamId: string) => void;
  toggleFollowLeague: (leagueId: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const makeId = () =>
  `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [fixtures, setFixtures] = useState<Fixture[]>(initialFixtures);
  const [followedTeamIds, setFollowedTeamIds] = useState<Set<string>>(
    new Set()
  );
  const [followedLeagueIds, setFollowedLeagueIds] = useState<Set<string>>(
    new Set()
  );

  const getFixtureById = useCallback(
    (id: string) => fixtures.find((f) => f.id === id),
    [fixtures]
  );

  const addPendingUpdate = useCallback(
    (
      fixtureId: string,
      proposedHomeScore: number,
      proposedAwayScore: number
    ) => {
      const update: PendingUpdate = {
        id: makeId(),
        fixtureId,
        proposedHomeScore,
        proposedAwayScore,
        timestamp: Date.now(),
      };
      setFixtures((prev) =>
        prev.map((f) =>
          f.id === fixtureId
            ? { ...f, pendingUpdates: [update, ...f.pendingUpdates] }
            : f
        )
      );
    },
    []
  );

  const confirmPendingUpdate = useCallback(
    (fixtureId: string, updateId: string) => {
      setFixtures((prev) =>
        prev.map((f) => {
          if (f.id !== fixtureId) return f;
          const chosen = f.pendingUpdates.find((u) => u.id === updateId);
          if (!chosen) return f;
          return {
            ...f,
            homeScore: chosen.proposedHomeScore,
            awayScore: chosen.proposedAwayScore,
            pendingUpdates: [],
          };
        })
      );
    },
    []
  );

  const dismissPendingUpdate = useCallback(
    (fixtureId: string, updateId: string) => {
      setFixtures((prev) =>
        prev.map((f) =>
          f.id === fixtureId
            ? {
                ...f,
                pendingUpdates: f.pendingUpdates.filter(
                  (u) => u.id !== updateId
                ),
              }
            : f
        )
      );
    },
    []
  );

  const toggleFollowTeam = useCallback((teamId: string) => {
    setFollowedTeamIds((prev) => {
      const next = new Set(prev);
      if (next.has(teamId)) next.delete(teamId);
      else next.add(teamId);
      return next;
    });
  }, []);

  const toggleFollowLeague = useCallback((leagueId: string) => {
    setFollowedLeagueIds((prev) => {
      const next = new Set(prev);
      if (next.has(leagueId)) next.delete(leagueId);
      else next.add(leagueId);
      return next;
    });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      fixtures,
      followedTeamIds,
      followedLeagueIds,
      getFixtureById,
      addPendingUpdate,
      confirmPendingUpdate,
      dismissPendingUpdate,
      toggleFollowTeam,
      toggleFollowLeague,
    }),
    [
      fixtures,
      followedTeamIds,
      followedLeagueIds,
      getFixtureById,
      addPendingUpdate,
      confirmPendingUpdate,
      dismissPendingUpdate,
      toggleFollowTeam,
      toggleFollowLeague,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
