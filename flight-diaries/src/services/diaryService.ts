import diaryData from '../../data/entries.json' with { type: "json"};
import type { DiaryEntry } from '../../types.ts';

const diaries: DiaryEntry[] = diaryData as DiaryEntry[];

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

function addDiary() {
    return null;
}

export default { getEntries, addDiary };