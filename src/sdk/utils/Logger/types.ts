export enum LoggerSpace {
  Analytics = 'analytics',
  Bootstrap = 'bootstrap',
  Common = 'common',
  Gql = 'graphql',
  Navigation = 'navigation',
  Network_Request = 'network_request',
  Network_Response = 'network_response',
  Push_Notifications = 'push_notifications',
  State = 'state',
  Storage = 'storage',
  User = 'user',
}

export type LoggerConfig = {
  isTerminal: boolean;
  spaces: {
    [key in LoggerSpace]: {
      isCollapsed: boolean;
      isEnabled: boolean;
      style: string;
    };
  };
};

export type PartialLoggerConfig = {
  isTerminal?: boolean;
  spaces: {
    [key in LoggerSpace]?: {
      isCollapsed?: boolean;
      isEnabled?: boolean;
      style?: string;
    };
  };
};
