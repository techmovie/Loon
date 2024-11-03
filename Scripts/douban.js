const url = $request.url;
if (!$response) $done({});
if (!$response.body) $done({});
const body = $response.body
const obj = JSON.parse(body)

if(url.match(/recommend_feed|home_timeline|suggest|reviews/)){
  obj.items = obj.items.filter(item=>{
    return !!item.type
  })
}

$done({body: JSON.stringify(obj)})