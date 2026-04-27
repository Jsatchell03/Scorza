# Scorza — Frontend Demo

Fully hardcoded React Native (Expo) frontend for a fan-driven, real-time sports platform.
All data is local — no backend, no API, no auth.

## Tech

- Expo (SDK 51) + React Native
- TypeScript, functional components + hooks
- React Navigation (Bottom Tabs + Native Stack)
- NativeWind v4 (Tailwind for React Native)

## Folder structure

```
Frontend/
├── App.tsx                 # Root: providers + navigation
├── index.ts                # Expo entry
├── app.json                # Expo config
├── babel.config.js         # NativeWind babel preset
├── metro.config.js         # NativeWind metro config
├── tailwind.config.js      # Design tokens (colors, etc.)
├── global.css              # Tailwind directives
├── tsconfig.json
├── nativewind-env.d.ts
├── package.json
│
├── types/
│   └── index.ts            # Shared types (Team, League, Fixture, ...)
│
├── data/
│   └── mockData.ts         # Hardcoded leagues, teams, fixtures
│
├── context/
│   └── AppContext.tsx      # Local state: fixtures, follows, pending updates
│
├── components/
│   ├── FixtureCard.tsx     # Reusable card for live / upcoming / past
│   ├── TeamCard.tsx
│   ├── LeagueCard.tsx
│   ├── TeamBadge.tsx
│   ├── LeagueBadge.tsx
│   ├── StatusBadge.tsx     # LIVE / FINAL / UPCOMING pill
│   ├── SegmentedToggle.tsx # Upcoming ↔ Past toggle
│   ├── FollowButton.tsx    # "+" ↔ "✓"
│   ├── ScoreUpdateModal.tsx
│   ├── PendingUpdateCard.tsx
│   ├── EmptyState.tsx
│   ├── ScreenHeader.tsx
│   └── formatters.ts
│
├── navigation/
│   ├── RootNavigator.tsx   # Native stack
│   └── TabNavigator.tsx    # Bottom tabs (Home, Search, Account)
│
└── screens/
    ├── HomeScreen.tsx
    ├── SearchScreen.tsx
    ├── AccountScreen.tsx
    ├── FixtureInfoScreen.tsx   # Core screen + score update flow
    ├── TeamInfoScreen.tsx
    └── LeagueInfoScreen.tsx
```

## Running the app

From the `Frontend/` directory:

```bash
npm install
npx expo start
```

Then:

- press `i` to open in the iOS simulator
- press `a` to open in the Android emulator
- or scan the QR code with the Expo Go app on a physical device

## Design tokens

Defined in `tailwind.config.js`:

| Token        | Value     | Usage                               |
| ------------ | --------- | ----------------------------------- |
| `primary`    | `#fd4902` | LIVE indicator, CTAs, highlights    |
| `dark`       | `#143355` | Primary text, team names, headers   |
| `background` | `#fdfcfb` | App background                      |
| `muted`      | `#8a94a6` | Secondary text                      |
| `hairline`   | `#eef0f3` | Dividers, subtle backgrounds        |

## Core feature: fan-driven score updates

On any **LIVE** fixture detail screen:

1. Tap **Submit Score Update**.
2. In the modal, use `+1 / +2 / +3` quick buttons or type scores manually.
3. Submit — the proposal lands in **Pending updates** with a timestamp.
4. Tap **Confirm** on a pending card → that proposal becomes the official
   score and **all other pending updates are cleared** (local state only).
