export interface SettingsItem {
  max_tokens: number;
  model: string;
  prompt: string;
  use_voice_generation: boolean;
  use_voice_recognition: boolean;
}

export interface AIModel {
  id: string;
}

export type UpdateSettings = SettingsItem;

export type SettingsResponse = SettingsItem;
