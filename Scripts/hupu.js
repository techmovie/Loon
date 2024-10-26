const url = $request.url;
if (!$response) $done({});
if (!$response.body) $done({});
const body = $response.body
const obj = JSON.parse(body)


// 隐藏个人页我的应用和广告
if(url.includes("bbsallapi/lego/data")){
  obj.data.cards = obj.data.cards.filter(card=>{
    !card.code.match(/advertisement|multiIcon/i)
  })
// 首页只显 赛程|数据|主队
}else if(url.includes("news/v3/tab")){
  obj.result = obj.result.filter(tab=>{
    return tab.name.match(/赛程|数据|主队/)
  })
// 比赛详情去除预测和游戏
}else if(url.includes("matchallapi/liveTabList")){
  obj.result.categoryList = obj.result.categoryList.filter(tab=>{
    return !tab.categoryName.match(/游戏|预测/)
  })
//比赛列表去除菠菜
}else if(url.includes("standard/getTabDetailScheduleList")){
  obj.result.dayGameData = obj.result.dayGameData.map(day=>{
     day.matchData = day.matchData.map(game=>{
      return {
        ...game,
        extraInfo: null
      }
    })
    return {
      ...day
    }
  })
// 去除顶部TAB的活动广告
}else if(url.includes("device/v1/init")){
  obj.result.activityNav = [];
}

$done({body: JSON.stringify(obj)})