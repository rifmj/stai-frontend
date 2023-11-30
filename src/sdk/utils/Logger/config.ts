import { LoggerConfig, LoggerSpace } from './types';

const defaultConfig: LoggerConfig = {
  isTerminal: false,
  spaces: {
    [LoggerSpace.Analytics]: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: white; background: #52BD94;',
    },
    [LoggerSpace.Bootstrap]: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: white; background: #4f46e5;',
    },
    [LoggerSpace.Gql]: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: white; background: rgb(200,46,144);',
    },
    [LoggerSpace.User]: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: white; background: #37b24d;',
    },
    common: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: #6d6875; background: #cddafd;',
    },
    navigation: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: #6d6875; background: #fde2e4;',
    },
    network_request: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: #6d6875; background: #ead2e1;',
    },
    network_response: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: #6d6875; background: #bee1e6;',
    },
    push_notifications: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: #6d6875; background: #f0efeb;',
    },
    state: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: #6d6875; background: #eae4e9;',
    },
    storage: {
      isCollapsed: true,
      isEnabled: true,
      style: 'color: #6d6875; background: #fff1e6;',
    },
  },
};

export default defaultConfig;
