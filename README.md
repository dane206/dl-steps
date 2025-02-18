# dl-steps

## What the Script Does

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

