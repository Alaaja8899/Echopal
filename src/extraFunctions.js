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

fetchIPLocation();
