// Create the request
const clientId = global.get("somfy_client_id");
const clientSecret = global.get("somfy_client_secret");
const accessToken = global.get("somfy_access_token");
const siteId = global.get("somfy_site_id");
const targetState = args[0];

let headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + accessToken};
let res;

// get site
res = await fetch('https://api.myfox.io/v3/site/' + siteId + '/security', 
{
  method: 'PUT',
  headers: headers,
  body: JSON.stringify({status: targetState})
});

if(!res.ok){
  throw new Error(res.statusText);
}



