export async function fetchIPLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const locationJson = {
            IP: data.ip,
            City: data.city,
            Region: data.region,
            Country: data.country_name,
            Organization: data.org
        }
        localStorage.setItem('location' , JSON.stringify(locationJson))

    } catch (error) {
        console.error('Error fetching IP location:', error);
    }
}

export async function requestMicPermission() {
    try {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // If permission is granted, you can now use the stream
        console.log("Microphone access granted.");
        // Do something with the stream, e.g., connect to an audio context
        // const audioContext = new AudioContext();
        // const source = audioContext.createMediaStreamSource(stream);
        // source.connect(audioContext.destination);

        // Stop all tracks after use to free up the mic
        stream.getTracks().forEach(track => track.stop());

    } catch (error) {
        if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
            console.error("Microphone access denied.");
        } else if (error.name === "NotFoundError" || error.name === "DevicesNotFoundError") {
            console.error("No microphone found.");
        } else {
            console.error("Error accessing the microphone: ", error);
        }

        // Notify the user that microphone access is needed
        alert("Microphone access is required for this feature. Please allow microphone access in your browser settings.");
    }
}

