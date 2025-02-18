// Capture Page Data
var pageHostname = window.location.hostname;
var pageURL = window.location.href;
var pageTitle = document.title;
var referrer = document.referrer || "";

// Detect Subdomains (edu, blog, articles, quiz, etc.)
var subdomain = pageHostname.split(".")[0];

// Capture UTM values from the URL
var urlParams = new URLSearchParams(window.location.search);
var utmSource = urlParams.get('utm_source') || "";
var utmMedium = urlParams.get('utm_medium') || "";
var utmCampaign = urlParams.get('utm_campaign') || "";
var utmTerm = urlParams.get('utm_term') || "";
var utmContent = urlParams.get('utm_content') || "";

// Build the view_presale event object including UTM values
var viewPresaleEvent = {
    "event": "view_presale",
    "page_hostname": pageHostname,
    "event_url": pageURL,
    "content_id": pageTitle,
    "subdomain": subdomain,
    "lead_source": referrer,
    "currency": "USD",
    "value": 0,
    "event_id": generateUUID(),
    "utm_source": utmSource,
    "utm_medium": utmMedium,
    "utm_campaign": utmCampaign,
    "utm_term": utmTerm,
    "utm_content": utmContent
};

window.dataLayer.push(viewPresaleEvent);
storeEvent("view_presale", viewPresaleEvent);
console.log("📢 Pushed View Presale Event:", viewPresaleEvent);
