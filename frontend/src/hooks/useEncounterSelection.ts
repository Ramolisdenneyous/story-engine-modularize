import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Monster } from "../appTypes";

function firstMonsterId(monsters: Monster[]) {
  return monsters[0]?.monster_id ?? "";
}

type UseEncounterSelectionOptions = {
  gmMonsters: Monster[];
  setEncounterModalOpen: Dispatch<SetStateAction<boolean>>;
};

export function useEncounterSelection({ gmMonsters, setEncounterModalOpen }: UseEncounterSelectionOptions) {
  const [encounterMonsterId, setEncounterMonsterId] = useState("");
  const [encounterQuantity, setEncounterQuantity] = useState(1);
  const selectedEncounterMonster = gmMonsters.find((monster) => monster.monster_id === encounterMonsterId) ?? gmMonsters[0] ?? null;
  const encounterMonsterIndex = Math.max(0, gmMonsters.findIndex((monster) => monster.monster_id === encounterMonsterId));

  useEffect(() => {
    setEncounterMonsterId((current) => {
      if (current && gmMonsters.some((monster) => monster.monster_id === current)) {
        return current;
      }
      return firstMonsterId(gmMonsters);
    });
  }, [gmMonsters]);

  function cycleEncounterMonster(direction: "previous" | "next") {
    if (!gmMonsters.length) return;
    const currentIndex = gmMonsters.findIndex((monster) => monster.monster_id === encounterMonsterId);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const offset = direction === "next" ? 1 : -1;
    const nextIndex = (safeIndex + offset + gmMonsters.length) % gmMonsters.length;
    setEncounterMonsterId(gmMonsters[nextIndex].monster_id);
  }

  function openEncounterModal() {
    setEncounterModalOpen(true);
  }

  return {
    encounterMonsterId,
    setEncounterMonsterId,
    encounterQuantity,
    setEncounterQuantity,
    selectedEncounterMonster,
    encounterMonsterIndex,
    cycleEncounterMonster,
    openEncounterModal,
  };
}
