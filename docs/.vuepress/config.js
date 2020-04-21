module.exports = {
    base: '/learn-ts/',
    title: 'ts學習',
    description: 'ts學習記錄',
    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/yulin3/learn-ts',
        // 自定义仓库链接文字。
        repoLabel: 'github',
        nav: [
            { text: '首页', link: '/' },
            { text: 'first', link: '/ts/first.md' }
        ],
        sidebar: [
            ['/', '首页'],
            ['/ts/first.md', '我的第一篇博客']
        ]
    }
  }