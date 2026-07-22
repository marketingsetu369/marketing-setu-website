import { en } from "./en";
import { hi } from "./hi";
import { mr } from "./mr";
import { Language, TranslationDictionary } from "./types";

export const translations: Record<Language, TranslationDictionary> = {
  en,
  mr,
  hi,
};

export type { Language, TranslationDictionary };
