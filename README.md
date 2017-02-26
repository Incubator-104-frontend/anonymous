## 介紹

此專案是用來將輸入的內容透過匿名的方式發佈於104內部 Slack 群組

中間沒有記錄任何資料，讓同仁們有個放心提供意見的管道

歡迎各位同仁一起來協作這個專案讓他更為完整好用

## 開發專案

### Install app

```
npm install
```

### Run app

```
npm start
```

### 關於開發

這份專案使用了 React + Redux + ES6 + Firebase + CSSModule 

以React create app 為基底，eslint 跟 jest都有安裝可以自行選用

Redux store 只拿來connect firebase 得資料而沒有真正的在使用他（但未來一定會用到）

資料夾區分方式

* config/ 放置webpack 等的環境變數
* public/ 靜態資源、global css
* src
    * actions/ redux action 目前沒有作用
    * component/ 最小元件
    * container/ 資料層組件、頁面
    * doc/ 放置 markdown 文件 （好像應該放在外面）
    * reducer/ 目前只有拿來跟firebase store串接
    * utils/ 共用工具
* router.js react router