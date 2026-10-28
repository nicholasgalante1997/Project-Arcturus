const BACKGROUND_TREATMENTS = ['paper', 'paper-original', 'drafting', 'contours', 'plain'] as const;

export type BackgroundTreatment = (typeof BACKGROUND_TREATMENTS)[number];

export function resolveBackgroundTreatment(treatment?: string | null): BackgroundTreatment {
  return BACKGROUND_TREATMENTS.find((candidate) => candidate === treatment) ?? 'paper';
}
