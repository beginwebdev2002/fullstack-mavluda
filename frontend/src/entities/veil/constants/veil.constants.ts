export enum VeilCategory {
  BRIDAL = "Bridal",
  EVENING = "Evening",
  ACCESSORIES = "Accessories",
}

export enum VeilSilhouette {
  BALL_GOWN = "Ball Gown",
  A_LINE = "A-Line",
  MERMAID = "Mermaid",
  TRUMPET = "Trumpet",
  SHEATH = "Sheath",
  FIT_AND_FLARE = "Fit and Flare",
}

export enum VeilNeckline {
  SWEETHEART = "Sweetheart",
  V_NECK = "V-Neck",
  HIGH_NECK = "High-Neck",
  OFF_THE_SHOULDER = "Off-the-shoulder",
  ILLUSION = "Illusion",
  SQUARE = "Square",
  ASYMMETRIC = "Asymmetric",
  PLUNGING = "Plunging",
}

export enum VeilFabric {
  SILK = "Silk",
  LACE = "Lace",
  TULLE = "Tulle",
  CHIFFON = "Chiffon",
  ORGANZA = "Organza",
  SATIN = "Satin",
  CREPE = "Crepe",
}

export enum VeilTrainLength {
  SWEEP = "Sweep",
  CHAPEL = "Chapel",
  CATHEDRAL = "Cathedral",
  ROYAL = "Royal",
  FLOOR_LENGTH = "Floor-length",
}

export const VEIL_CATEGORIES = Object.values(VeilCategory);
export const VEIL_SILHOUETTES = Object.values(VeilSilhouette);
export const VEIL_NECKLINES = Object.values(VeilNeckline);
export const VEIL_FABRICS = Object.values(VeilFabric);
export const VEIL_TRAIN_LENGTHS = Object.values(VeilTrainLength);
