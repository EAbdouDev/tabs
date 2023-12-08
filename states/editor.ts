import { create } from "zustand";

type State = {
  fileName: string;
};

type Action = {
  updateFileName: (firstName: State["fileName"]) => void;
};

export const useFileName = create<State & Action>((set) => ({
  fileName: "Untitled",
  updateFileName: (fileName) => set(() => ({ fileName: fileName })),
}));

type StateWord = {
  wordCount: number | null;
  charCount: number | null;
};

type ActionWord = {
  updateWordCount: (wordCount: StateWord["wordCount"]) => void;
  updateCharCount: (CharCount: StateWord["charCount"]) => void;
};

export const useWords = create<StateWord & ActionWord>((set) => ({
  wordCount: 0,
  charCount: 0,
  updateWordCount: (wordCount) => set(() => ({ wordCount: wordCount })),
  updateCharCount: (charCount) => set(() => ({ charCount: charCount })),
}));
