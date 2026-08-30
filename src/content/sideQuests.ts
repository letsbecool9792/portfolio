import data from "./sideQuests.json";

export type SideQuest = {
    title: string;
    desc: string;
    img: string;
};

/** Single source of truth for the hobby cards. */
export const SIDE_QUESTS = data as SideQuest[];
