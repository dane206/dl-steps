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
