# 钉钉机器人消息发送工具



#### 项目简介



这是一个基于 HTML 和 Nginx 代理的钉钉机器人消息发送工具，允许通过网页向钉钉群发送消息通知。工具通过 Nginx 代理解决了跨域问题和 IP 白名单限制，使用简单方便。


####  功能特点





*   简洁的网页界面，支持输入消息内容并发送到钉钉群


*   通过 Nginx 代理实现跨域请求和 IP 白名单管理


*   支持消息发送状态实时反馈


*   自动保存 Access Token，避免重复输入


*   IP 检测功能，方便配置钉钉机器人白名单


#### 环境要求





*   前端运行环境：现代浏览器（Chrome、Firefox、Edge 等）


*   后端环境：Nginx 服务器（版本 >= 1.10）


## 部署步骤



#### 1. 前端部署&#xA;



1.  将 `index.html` 文件上传到服务器的 Web 根目录（如 `/www/wwwroot/81/`）


#### 2. Nginx 配置&#xA;

##### 配置文件修改&#xA;

在 Nginx 配置文件中添加以下代理规则：




```
location /dingtalk/webhook {
    # 钉钉机器人API基础地址
    proxy_pass https://oapi.dingtalk.com/robot/send;
    
    # 代理请求头设置
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
    
    # 代理超时设置
    proxy_connect_timeout 60s;
    proxy_read_timeout 60s;
    proxy_send_timeout 60s;
}
```

##### 完整配置示例&#xA;

见nginx.conf

#### 应用配置&#xA;



检查 Nginx 配置语法：




```
nginx -t
```



重启 Nginx 服务：




```
systemctl restart nginx
```

#### 使用说明





1.  访问部署好的网页，输入钉钉机器人的 Access Token


2.  输入要发送的消息内容


3.  点击 "发送消息" 按钮


4.  查看发送结果反馈


#### IP 白名单配置





1.  点击 "检测当前请求 IP" 按钮，获取当前请求的公网 IP


2.  登录钉钉管理后台，找到对应的机器人设置


3.  在安全设置中添加检测到的 IP 到白名单


4.  保存设置后重新发送消息


## 常见问题



#### 1. 发送消息失败，提示 IP 不在白名单中&#xA;



*   确认已将服务器公网 IP 添加到钉钉机器人白名单


*   点击 "检测当前请求 IP" 按钮，确认显示的 IP 与添加的 IP 一致


*   若使用了负载均衡或 CDN，需将对应 IP 添加到白名单


#### 2. 页面提示跨域错误&#xA;



*   确认 Nginx 配置中已正确添加跨域相关头信息


*   检查前端请求是否使用了正确的代理路径（`/dingtalk/webhook`）


#### 3. 消息发送成功但钉钉未收到消息&#xA;



*   确认 Access Token 正确无误


*   检查消息内容是否符合钉钉机器人消息格式要求


*   查看 Nginx 错误日志（`/www/wwwlogs/error.log`）获取更多信息


#### 4.安全建议





1.  不要将 Access Token 泄露给无关人员


2.  在生产环境中建议限制 Nginx 代理路径的访问权限


3.  定期更换 Access Token，提高安全性


4.  考虑在 Nginx 中添加 IP 白名单，限制可访问代理的 IP 地址

