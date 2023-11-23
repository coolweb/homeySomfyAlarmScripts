// Create the request
const clientId = '84eddf48-2b8e-11e5-b2a5-124cfab25595_475buqrf8v8kgwoo4gow08gkkc0ck80488wo44s8o48sg84k40';
const clientSecret = '4dsqfntieu0wckwwo40kw848gw4o0c8k4owc80k4go0cs0k844';
const username = 'YOUR_EMAIL';
const password = 'YOUR_PASSWORD';
global.set("somfy_client_id", clientId);
global.set("somfy_client_secret", clientSecret);
global.set("somfy_username", username);
global.set("somfy_password", password);

let headers = {'Content-Type': 'application/json', 'Accept-Encoding': 'gzip'};
let res;

// get access token
res = await fetch('https://sso.myfox.io/oauth/oauth/v2/token', 
{
  method: 'POST',
  body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      username: username,
      password: password,
      grant_type: "password"
    }),
  headers: headers,
});

if(!res.ok){
  throw new Error(res.statusText);
}

const response = JSON.parse(await res.text());
log(JSON.stringify(response));

global.set("somfy_access_token", response.access_token);
global.set("somfy_refresh_token", response.refresh_token);
