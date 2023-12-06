export interface SettingsItem {
  greeting: string;
  max_tokens: number;
  model: string;
  prompt: string;
  require_auth: boolean;
  unauthorized_message: string;
  use_voice_generation: boolean;
  use_voice_recognition: boolean;
}

export interface AIModel {
  id: string;
}

export type UpdateSettings = SettingsItem;

export type SettingsResponse = SettingsItem;
