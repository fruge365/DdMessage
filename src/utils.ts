import axios from 'axios';

export async function getCurrentIP(): Promise<string> {
  const apis = [
    'https://api.ipify.org?format=json',
    'https://ipinfo.io/json',
    'https://api.myip.com'
  ];

  for (const api of apis) {
    try {
      const response = await axios.get(api, { timeout: 5000 });
      const data = response.data;
      return data.ip || data.ipaddress || '';
    } catch (error) {
      continue;
    }
  }
  
  throw new Error('无法获取当前IP地址');
}

export function createProxyConfig(serverIP: string): string {
  return `location /dingtalk/webhook {
    proxy_pass https://oapi.dingtalk.com/robot/send;
    proxy_set_header Host oapi.dingtalk.com;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
    
    if ($request_method = 'OPTIONS') {
        return 204;
    }
    
    proxy_connect_timeout 60s;
    proxy_read_timeout 60s;
    proxy_send_timeout 60s;
}`;
}