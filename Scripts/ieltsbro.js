const body = $response.body
const url = $request.url;
const obj = JSON.parse(body)

if(obj.message === 'success'){
  
  if(url.includes("home-recommend2")){ // 去部分顶部banner
    obj.content.classes = []
  }else if(url.match(/(home\/recommend)|listV2/i)){ // 去部分顶部banner 去弹窗
    obj.content = []
  }else if(url.match(/getModuleList/i)){ //隐藏许愿池
    obj.content = obj.content.filter(item=>item.moduleName!=="许愿池")
  }
}

$done({body: JSON.stringify(obj)})