### Initializes the Data Layer:
This ensures that window.dataLayer exists even before GTM loads.
```javascript
window.dataLayer = window.dataLayer || [];
```

### Generates Unique IDs:
This function creates a unique identifier for each event, using crypto.randomUUID() if available, or a fallback method.
```javascript
function generateUUID() {
    return crypto.randomUUID ? crypto.randomUUID() : 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
```

### Stores Events in Session Storage:
This function captures each event and saves it in the browser’s sessionStorage, which can be useful for debugging or later retrieval.
```javascript
function storeEvent(eventName, eventData) {
    try {
        var storedEvents = JSON.parse(sessionStorage.getItem("tracked_events")) || [];
        storedEvents.push({
            event: eventName,
            data: eventData,
            timestamp: new Date().toISOString()
        });
        sessionStorage.setItem("tracked_events", JSON.stringify(storedEvents));
        console.log(`✅ Stored Event in sessionStorage: ${eventName}`, eventData);
    } catch (error) {
        console.error("❌ Error storing event in sessionStorage:", error);
    }
}
```

### Runs Once the DOM Is Ready:
The script waits until the DOM is loaded before running, ensuring that elements like document.title are available.
```javascript
document.addEventListener("DOMContentLoaded", function() {
    console.log("🔥 Tracking Script Loaded!");
    // Capture page details…
});
```

#### view_presale event:
You can capture UTM values from the URL and include them in your view_presale event. One common approach is to use the URLSearchParams API to read these query parameters. Here's an updated example of your view_presale.js file with UTM capturing:
```javascript
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
```

