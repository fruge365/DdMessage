# 📢 ddmessage-fruge365

> 钉钉机器人消息发送 npm 库，支持文本、Markdown、链接等多种消息类型

[![npm version](https://img.shields.io/npm/v/ddmessage-fruge365.svg)](https://www.npmjs.com/package/ddmessage-fruge365)
[![license](https://img.shields.io/npm/l/ddmessage-fruge365.svg)](https://github.com/fruge365/DdMessage/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dm/ddmessage-fruge365.svg)](https://www.npmjs.com/package/ddmessage-fruge365)

## 一、特性

- 🎯 简单易用 - 一行代码发送消息
- 🌐 跨平台支持 - Node.js 和浏览器环境
- 📝 多种消息类型 - 文本、Markdown、链接消息
- 🔧 TypeScript 支持 - 完整的类型定义
- 🛡️ 跨域解决方案 - 内置代理配置支持
- 📱 @ 功能 - 支持 @ 指定用户或全员

## 二、安装

```bash
# npm
npm install ddmessage-fruge365

# yarn
yarn add ddmessage-fruge365

# pnpm
pnpm add ddmessage-fruge365
```

## 三、快速开始

### 1. Node.js 环境

```javascript
const DingTalkRobot = require('ddmessage-fruge365');

const robot = new DingTalkRobot({
  accessToken: 'your-access-token'
});

// 发送消息
await robot.sendText('Hello, 钉钉! 🎉');
```

### 2. 浏览器环境

```javascript
import DingTalkRobot from 'ddmessage-fruge365';

const robot = new DingTalkRobot({
  accessToken: 'your-access-token',
  proxyPath: '/dd-api' // 代理路径
});

await robot.sendText('Hello from browser! 🌐');
```

## 四、代理配置

由于浏览器跨域限制，需要配置代理服务器：

### 1. Vite 配置

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

### 2. Webpack 配置

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

### 3. Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # 钉钉机器人代理
    location /dd-api {
        proxy_pass https://oapi.dingtalk.com/robot/send;
        proxy_set_header Host oapi.dingtalk.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 跨域配置
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
        
        # 处理预检请求
        if ($request_method = 'OPTIONS') {
            return 204;
        }
        
        # 超时配置
        proxy_connect_timeout 60s;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
    
    # 其他配置...
}
```

## 五、消息类型

### 1. 文本消息

```javascript
// 普通文本消息
await robot.sendText('这是一条普通的文本消息');

// 带 @ 功能的文本消息
await robot.sendText('🚨 重要通知：系统将于今晚维护', {
  atMobiles: ['13800138000', '13800138001'], // @ 指定手机号
  atUserIds: ['user123', 'user456'],        // @ 指定用户ID
  isAtAll: false                            // 是否 @ 所有人
});

// @ 所有人
await robot.sendText('📢 全员通知：会议开始了！', {
  isAtAll: true
});
```

### 2. Markdown 消息

```javascript
const markdownContent = `
## 📊 项目进度报告

### ✅ 已完成
- [x] 用户登录模块
- [x] 数据统计功能
- [x] 消息推送系统

### 🔄 进行中
- [ ] 支付模块开发
- [ ] 性能优化

### 📈 数据概览
| 模块 | 进度 | 负责人 |
|------|------|--------|
| 前端 | 90% | 张三 |
| 后端 | 85% | 李四 |
| 测试 | 70% | 王五 |

### 🔗 相关链接
- [项目地址](https://github.com/your-repo)
- [在线预览](https://your-demo.com)
`;

await robot.sendMarkdown('📊 每日项目报告', markdownContent);

// 带 @ 功能的 Markdown 消息
await robot.sendMarkdown('🔥 重要更新', markdownContent, {
  atMobiles: ['13800138000'],
  isAtAll: false
});
```

### 3. 链接消息

```javascript
await robot.sendLink(
  '🎉 新版本发布',                           // 标题
  '点击查看 v2.0 版本的新功能和改进',          // 描述
  'https://github.com/your-repo/releases',   // 链接地址
  'https://your-site.com/images/banner.jpg'  // 图片地址（可选）
);
```

## 六、配置选项

```typescript
interface DingTalkConfig {
  accessToken: string;    // 🔑 必需：机器人 Access Token
  baseUrl?: string;       // 🌐 可选：API 基础地址，默认钉钉官方地址
  timeout?: number;       // ⏱️ 可选：请求超时时间（毫秒），默认 10000
  proxyPath?: string;     // 🔄 可选：代理路径，用于解决跨域问题
}
```

## 七、API 文档

### 1. DingTalkRobot 类

#### 构造函数
```typescript
new DingTalkRobot(config: DingTalkConfig)
```

#### 方法

| 方法 | 描述 | 参数 | 返回值 |
|------|------|------|--------|
| `sendText` | 发送文本消息 | `content: string, at?: AtOptions` | `Promise<DingTalkResponse>` |
| `sendMarkdown` | 发送 Markdown 消息 | `title: string, text: string, at?: AtOptions` | `Promise<DingTalkResponse>` |
| `sendLink` | 发送链接消息 | `title: string, text: string, messageUrl: string, picUrl?: string` | `Promise<DingTalkResponse>` |
| `send` | 发送自定义消息 | `message: Message` | `Promise<DingTalkResponse>` |

### 2. 类型定义

```typescript
interface AtOptions {
  atMobiles?: string[];   // 📱 @ 的手机号列表
  atUserIds?: string[];   // 👤 @ 的用户 ID 列表
  isAtAll?: boolean;      // 📢 是否 @ 所有人
}

interface DingTalkResponse {
  errcode: number;        // 📊 错误码，0 表示成功
  errmsg: string;         // 📝 错误信息
}
```

## 八、工具函数

```javascript
// Node.js 环境
const { getCurrentIP, createProxyConfig } = require('ddmessage-fruge365/lib/utils');

// ES 模块环境
import { getCurrentIP, createProxyConfig } from 'ddmessage-fruge365/lib/utils';

// 🌐 获取当前 IP（用于配置白名单）
const ip = await getCurrentIP();
console.log('当前 IP:', ip);

// 📋 生成 Nginx 代理配置
const nginxConfig = createProxyConfig('/dd-api');
console.log(nginxConfig);
```

## 九、错误处理

```javascript
try {
  const result = await robot.sendText('测试消息');
  
  if (result.errcode === 0) {
    console.log('✅ 发送成功');
  } else {
    console.error('❌ 发送失败:', result.errmsg);
  }
} catch (error) {
  console.error('🚨 请求失败:', error.message);
}
```

## 十、完整示例

```javascript
import DingTalkRobot from 'ddmessage-fruge365';

// 创建机器人实例
const robot = new DingTalkRobot({
  accessToken: 'your-access-token',
  proxyPath: '/dd-api' // 浏览器环境需要
});

async function sendDailyReport() {
  try {
    // 📢 发送启动通知
    await robot.sendText('🚀 系统启动成功！服务已正常运行');
    
    // 📊 发送 Markdown 报告
    await robot.sendMarkdown('📈 每日数据报告', `
## 📊 今日数据概览

### 📈 关键指标
- **用户访问量**: 1,234 (+12%)
- **新增用户**: 56 (+8%)
- **订单数量**: 89 (+15%)
- **收入**: ¥12,345 (+20%)

### ✅ 今日完成
- [x] 完成功能开发
- [x] 修复 3 个 bug 🐛
- [x] 代码审查通过 👍
- [x] 部署到生产环境 🚀

### 📅 明日计划
- [ ] 新功能测试
- [ ] 性能优化
- [ ] 用户反馈处理
    `, {
      atMobiles: ['13800138000'], // @ 相关负责人
    });
    
    // 🔗 发送链接
    await robot.sendLink(
      '📊 查看详细报告',
      '点击查看完整的数据分析报告和图表',
      'https://your-dashboard.com/report',
      'https://your-site.com/images/report-preview.jpg'
    );
    
    console.log('✅ 所有消息发送成功');
  } catch (error) {
    console.error('❌ 发送失败:', error.message);
  }
}

// 执行发送
sendDailyReport();
```

## 许可证

MIT © [fruge365](https://github.com/fruge365) | [CSDN 博客](https://fruge365.blog.csdn.net/)

---

<div align="center">

**🎉 如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！**

[📖 GitHub](https://github.com/fruge365/DdMessage) • [📦 NPM](https://www.npmjs.com/package/ddmessage-fruge365) • [✍️ CSDN](https://fruge365.blog.csdn.net/) • [🐛 报告问题](https://github.com/fruge365/DdMessage/issues) • [💡 功能建议](https://github.com/fruge365/DdMessage/issues)

</div>