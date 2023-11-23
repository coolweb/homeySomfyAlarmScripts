// Create the request
const clientId = global.get("somfy_client_id");
const clientSecret = global.get("somfy_client_secret");
const refreshToken = global.get("somfy_refresh_token");

let headers = {'Content-Type': 'application/json', 'Accept-Encoding': 'gzip'};
let res;

// get access token
res = await fetch('https://sso.myfox.io/oauth/oauth/v2/token', 
{
  method: 'POST',
  body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    }),
  headers: headers,
});

if(!res.ok){
  throw new Error(res.statusText);
}

const response = JSON.parse(await res.text());
log(JSON.stringify(response));

global.set("somfy_refresh_token", response.refresh_token);
