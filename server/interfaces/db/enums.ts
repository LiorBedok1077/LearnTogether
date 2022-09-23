
// Enum - Gender
export const GenderEnum = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    OTHER: "OTHER",
    RATHER_NOT_TO_SAY: "RATHER_NOT_TO_SAY",
    HELICOPTER: "HELICOPTER"
}
export type GenderEnumType = keyof typeof GenderEnum

// Enum - prefered languages
export const PreferedLanguagesEnum = {
    ARABIC: "ARABIC",
    ENGLISH: "ENGLISH",
    FRENCH: "FRENCH",
    HEBREW: "HEBREW",
    KOREAN: "KOREAN",
    RUSSIAN: "RUSSIAN",
    SPANISH: "SPANISH"
}
export type PreferedLanguagesEnumType = keyof typeof PreferedLanguagesEnum

// Enum - Pages (temp)
export enum PagesEnum {
    ONE,
    TWO,
    FOUR,
}
