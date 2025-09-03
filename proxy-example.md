# 代理配置示例

## Nginx 配置

```nginx
location /dd-api {
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
}
```

## Vite 代理配置

```javascript
// vite.config.js
export default {
  server: {
    proxy: {
      '/dd-api': {
        target: 'https://oapi.dingtalk.com/robot/send',
        changeOrigin: true,
        rewrite: (path) => path.replace('/dd-api', ''),
      },
    },
  },
}
```

## 使用方式

```javascript
import DingTalkRobot from 'ddmessage-fruge365';

const robot = new DingTalkRobot({
  accessToken: 'your-access-token',
  proxyPath: '/dd-api'  // 对应上面的 nginx location
});

await robot.sendText('Hello World!');
```

## 其他代理服务器

### Apache
```apache
ProxyPass /dd-api https://oapi.dingtalk.com/robot/send
ProxyPassReverse /dd-api https://oapi.dingtalk.com/robot/send
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header always set Access-Control-Allow-Headers "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
```

### Webpack DevServer
```javascript
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/dd-api': {
        target: 'https://oapi.dingtalk.com/robot/send',
        changeOrigin: true,
        pathRewrite: { '^/dd-api': '' },
      },
    },
  },
};
```

### Node.js Express
```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/dd-api', createProxyMiddleware({
  target: 'https://oapi.dingtalk.com/robot/send',
  changeOrigin: true,
  pathRewrite: { '^/dd-api': '' },
}));
```