// Create the request
const clientId = global.get("somfy_client_id");
const clientSecret = global.get("somfy_client_secret");
const accessToken = global.get("somfy_access_token");

let headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken};
let res;

// get all sites
res = await fetch('https://api.myfox.io/v3/site', 
{
  method: 'GET',
  headers: headers,
});

if(!res.ok){
  throw new Error(res.statusText);
}

let response = JSON.parse(await res.text());
const siteId = response.items[0].site_id;
global.set("somfy_site_id", siteId);

// get site
res = await fetch('https://api.myfox.io/v3/site/' + siteId, 
{
  method: 'GET',
  headers: headers,
});

if(!res.ok){
  throw new Error(res.statusText);
}

response = JSON.parse(await res.text());
await tag('somfy_state', response.security_level);

