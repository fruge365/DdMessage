const DingTalkRobot = require('./lib/index');

// 使用示例
async function example() {
  // Node.js 环境（无跨域问题）
  const robot = new DingTalkRobot({
    accessToken: 'your-access-token-here'
  });

  // 浏览器环境（需要代理解决跨域）
  // const robot = new DingTalkRobot({
  //   accessToken: 'your-access-token-here',
  //   proxyPath: '/dd-api'
  // });

  try {
    // 发送文本消息
    const textResult = await robot.sendText('Hello from npm package!');
    console.log('文本消息发送结果:', textResult);

    // 发送 Markdown 消息
    const markdownResult = await robot.sendMarkdown(
      '测试标题',
      '## 这是一个测试\n- 功能1\n- 功能2'
    );
    console.log('Markdown消息发送结果:', markdownResult);

    // 发送链接消息
    const linkResult = await robot.sendLink(
      'GitHub',
      '查看项目源码',
      'https://github.com'
    );
    console.log('链接消息发送结果:', linkResult);

  } catch (error) {
    console.error('发送失败:', error.message);
  }
}

// 取消注释下面的行来运行示例
// example();