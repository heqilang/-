### git commit 时操作及注意事项

git commit 失败时，请检查错误并改正；如果未发现错误，则执行`npm run format`格式化全局代码；以上操作完成后，重新`git commit`即可；

##### 代码格式化命令

###### 检查代码

> `npm run check`

###### 格式化代码

> `npm run format`

### Prettier(代码格式化工具)

##### vscode 安装方式

手动安装 prettier 工具后，在项目根目录下运行命令 `npm install prettier -D --save-exact` ，再将 settings.json 设置为如下代码。

```
{
    "editor.fontSize": 14,
    "vetur.format.defaultFormatter.html": "prettier",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.formatOnSave": false,
    "team.showWelcomeMessage": false,
    "editor.wordWrap": "bounded",
    "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```
