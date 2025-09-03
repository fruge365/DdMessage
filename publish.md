# 发布指南

## 发布到 npm

1. 登录 npm 账户：
```bash
npm login
```

2. 发布包：
```bash
npm publish
```

## 本地测试

1. 在项目根目录创建链接：
```bash
npm link
```

2. 在其他项目中使用：
```bash
npm link ddmessage-fruge365
```

## 版本管理

更新版本号：
```bash
npm version patch  # 补丁版本 1.0.0 -> 1.0.1
npm version minor  # 次版本 1.0.0 -> 1.1.0  
npm version major  # 主版本 1.0.0 -> 2.0.0
```