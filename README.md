# 单页面应用项目基础框架

脚手架使用 Vue-Cli 3.5.1

技术栈：Vue+Webpack+Vue-Route+Vuex+Fetch

### 目录结构

```javascript
|-- config/ 			环境变量配置
|-- src/ 				源代码目录
	|-- api/ 		API接口目录
	|-- assets/ 	静态资源，图片、字体等
	|-- common/ 	公共方法
	|-- components/ 公共组件
	|-- router/ 	前端路由配置
	|-- store/		应用状态管理Vuex
	|-- views/		视图
	|-- App.vue 	入口视图
	|-- login.js 	处理登录逻辑
	|-- main.js 	入口文件
	|__ ui.js 		UI组件配置
|-- public/ 			不被处理的文件目录，会被直接拷贝
|-- .editconfig			编辑器配置
|-- .env 				公共环境变量配置
|-- .env.development  	开发环境变量配置
|-- .env.production 	生产环境变量配置
|-- .eslintrc.js		eslint校验规则
|-- .gitignore 			git忽略配置
|-- .babel.config.js 	babel配置
|-- package.json 		依赖包配置
|__ vue.config.js 		vue-cli配置
```



## 开发

#### 接口文档

#### 安装依赖

``` 
npm install  // cnpm install
// npm install --registry=https://registry.npm.taobao.org
```

#### 启动开发

``` 
npm run serve
```

#### 发布生产

```
npm run build
```

#### 启动包分析工具

```
npm run build:site
```

打开 http://localhost:8888



### 注意事项

1、已开启eslint代码校验，必须严格遵循规范编写代码

VS Code 下如何开启

编辑器需要装ESLint插件，然后在用户设置setting.json里设置启用

```
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        {
            "language": "vue",
            "autoFix": true
        }
    ],
    "eslint.options": {
        "plugins": [
            "html"
        ],
        "extensions": [
            ".js",
            ".vue"
        ]
    },
```



### 组件及工具说明

在线测试数据：https://www.easy-mock.com

Element-UI：http://element-cn.eleme.io/#/zh-CN

VUE 文档：https://cn.vuejs.org/v2/guide/

阿里妈妈UX图标库：http://www.iconfont.cn/

图标组件：https://ionicons.com/

