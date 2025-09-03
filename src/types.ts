export interface DingTalkConfig {
  accessToken: string;
  baseUrl?: string;
  timeout?: number;
  proxyPath?: string;
}

export interface TextMessage {
  msgtype: 'text';
  text: {
    content: string;
  };
  at?: {
    atMobiles?: string[];
    atUserIds?: string[];
    isAtAll?: boolean;
  };
}

export interface MarkdownMessage {
  msgtype: 'markdown';
  markdown: {
    title: string;
    text: string;
  };
  at?: {
    atMobiles?: string[];
    atUserIds?: string[];
    isAtAll?: boolean;
  };
}

export interface LinkMessage {
  msgtype: 'link';
  link: {
    text: string;
    title: string;
    picUrl?: string;
    messageUrl: string;
  };
}

export type Message = TextMessage | MarkdownMessage | LinkMessage;

export interface DingTalkResponse {
  errcode: number;
  errmsg: string;
}