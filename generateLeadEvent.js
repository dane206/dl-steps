// Listen for clicks on relevant links
document.addEventListener("click", function(event) {
    var target = event.target.closest("a");
    if (target) {
        var destinationURL = new URL(target.href);
        var destinationHostname = destinationURL.hostname;

        // Check if clicking from edu.terrahealthessentials.com to terrahealthessentials.com
        if (
            window.location.hostname.includes("edu.terrahealthessentials.com") &&
            (destinationHostname === "terrahealthessentials.com" || destinationHostname === "www.terrahealthessentials.com")
        ) {
            var generateLeadEvent = {
                "event": "generate_lead",
                "destination_url": target.href,
                "origin_url": window.location.href,
                "lead_source": document.referrer || "",
                "subdomain": window.location.hostname.split(".")[0],
                "event_id": generateUUID()
            };

            // Push and store the event immediately
            window.dataLayer.push(generateLeadEvent);
            storeEvent("generate_lead", generateLeadEvent);
            console.log("📢 Pushed Generate Lead Event:", generateLeadEvent);
        }
    }
});
