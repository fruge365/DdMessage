import axios, { AxiosInstance } from 'axios';
import { DingTalkConfig, Message, DingTalkResponse, TextMessage, MarkdownMessage, LinkMessage } from './types';

export class DingTalkRobot {
  private client: AxiosInstance;
  private accessToken: string;
  private proxyPath?: string;

  constructor(config: DingTalkConfig) {
    this.accessToken = config.accessToken;
    this.proxyPath = config.proxyPath;

    // 如果提供了代理路径，使用当前域名；否则使用钉钉官方地址
    const baseURL = this.proxyPath ? '' : (config.baseUrl || 'https://oapi.dingtalk.com');

    this.client = axios.create({
      baseURL,
      timeout: config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async send(message: Message): Promise<DingTalkResponse> {
    try {
      let response;

      if (this.proxyPath) {
        // 使用代理时，直接请求代理路径
        const url = `${this.proxyPath}?access_token=${this.accessToken}`;
        response = await axios.post(url, message, {
          timeout: 10000,
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        // 不使用代理时，使用配置的 client
        const url = `/robot/send?access_token=${this.accessToken}`;

        response = await this.client.post(url, message);
      }

      return response.data;
    } catch (error: any) {
      throw new Error(`发送消息失败: ${error.message}`);
    }
  }

  async sendText(content: string, at?: { atMobiles?: string[]; atUserIds?: string[]; isAtAll?: boolean }): Promise<DingTalkResponse> {
    const message: TextMessage = {
      msgtype: 'text',
      text: { content },
      ...(at && { at }),
    };
    return this.send(message);
  }

  async sendMarkdown(title: string, text: string, at?: { atMobiles?: string[]; atUserIds?: string[]; isAtAll?: boolean }): Promise<DingTalkResponse> {
    const message: MarkdownMessage = {
      msgtype: 'markdown',
      markdown: { title, text },
      ...(at && { at }),
    };
    return this.send(message);
  }

  async sendLink(title: string, text: string, messageUrl: string, picUrl?: string): Promise<DingTalkResponse> {
    const message: LinkMessage = {
      msgtype: 'link',
      link: { title, text, messageUrl, ...(picUrl && { picUrl }) },
    };
    return this.send(message);
  }
}

export * from './types';
export default DingTalkRobot;