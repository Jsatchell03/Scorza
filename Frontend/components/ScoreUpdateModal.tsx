import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Fixture } from "../types";
import { getTeamById } from "../data/mockData";
import TeamBadge from "./TeamBadge";

interface ScoreUpdateModalProps {
  visible: boolean;
  fixture: Fixture;
  onClose: () => void;
  onSubmit: (homeScore: number, awayScore: number) => void;
}

const ScoreUpdateModal: React.FC<ScoreUpdateModalProps> = ({
  visible,
  fixture,
  onClose,
  onSubmit,
}) => {
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  const [homeScore, setHomeScore] = useState(fixture.homeScore);
  const [awayScore, setAwayScore] = useState(fixture.awayScore);

  useEffect(() => {
    if (visible) {
      setHomeScore(fixture.homeScore);
      setAwayScore(fixture.awayScore);
    }
  }, [visible, fixture.homeScore, fixture.awayScore]);

  if (!home || !away) return null;

  const bump = (side: "home" | "away", delta: number) => {
    if (side === "home") setHomeScore((s) => Math.max(0, s + delta));
    else setAwayScore((s) => Math.max(0, s + delta));
  };

  const changed =
    homeScore !== fixture.homeScore || awayScore !== fixture.awayScore;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(20,51,85,0.45)",
        }}
      >
        <Pressable
          onPress={onClose}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <View className="rounded-t-3xl bg-white px-5 pb-8 pt-4">
          <View className="mb-4 items-center">
            <View className="h-1 w-12 rounded-full bg-hairline" />
          </View>

          <Text className="text-[20px] font-extrabold text-dark">
            Submit score update
          </Text>
          <Text className="mb-5 text-[13px] text-muted">
            Propose the current score — other fans will confirm it.
          </Text>

          <TeamScoreRow
            name={home.name}
            shortName={home.shortName}
            color={home.color}
            score={homeScore}
            onChange={(v) => setHomeScore(v)}
            onBump={(d) => bump("home", d)}
          />

          <View className="my-3 h-px bg-hairline" />

          <TeamScoreRow
            name={away.name}
            shortName={away.shortName}
            color={away.color}
            score={awayScore}
            onChange={(v) => setAwayScore(v)}
            onBump={(d) => bump("away", d)}
          />

          <View className="mt-6 flex-row">
            <Pressable
              onPress={onClose}
              className="mr-2 flex-1 items-center justify-center rounded-2xl bg-hairline py-3.5"
            >
              <Text className="text-[14px] font-semibold text-dark">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                if (!changed) return;
                onSubmit(homeScore, awayScore);
              }}
              className={`flex-1 items-center justify-center rounded-2xl py-3.5 ${
                changed ? "bg-primary" : "bg-primary/40"
              }`}
            >
              <Text className="text-[14px] font-bold text-white">
                Submit update
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

interface TeamScoreRowProps {
  name: string;
  shortName: string;
  color: string;
  score: number;
  onChange: (value: number) => void;
  onBump: (delta: number) => void;
}

const TeamScoreRow: React.FC<TeamScoreRowProps> = ({
  name,
  shortName,
  color,
  score,
  onChange,
  onBump,
}) => (
  <View>
    <View className="flex-row items-center">
      <TeamBadge shortName={shortName} color={color} size="md" />
      <View className="ml-3 flex-1">
        <Text className="text-[15px] font-semibold text-dark" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-[11px] text-muted">Proposed score</Text>
      </View>
      <TextInput
        value={String(score)}
        keyboardType="number-pad"
        onChangeText={(t) => {
          const n = parseInt(t.replace(/[^0-9]/g, ""), 10);
          onChange(Number.isFinite(n) ? n : 0);
        }}
        className="ml-3 w-16 rounded-xl bg-hairline py-2 text-center text-[18px] font-bold text-dark"
        maxLength={3}
      />
    </View>
    <View className="mt-3 flex-row">
      {[1, 2, 3].map((n) => (
        <Pressable
          key={n}
          onPress={() => onBump(n)}
          className="mr-2 flex-1 items-center justify-center rounded-xl border border-primary/30 bg-primary-soft py-2.5"
        >
          <Text className="text-[13px] font-bold text-primary">+{n}</Text>
        </Pressable>
      ))}
      <Pressable
        onPress={() => onBump(-1)}
        className="flex-1 items-center justify-center rounded-xl border border-hairline bg-white py-2.5"
      >
        <Text className="text-[13px] font-bold text-dark">−1</Text>
      </Pressable>
    </View>
  </View>
);

export default ScoreUpdateModal;
