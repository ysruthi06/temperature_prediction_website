document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let hour = document.getElementById('hour').value;
    let ws = document.getElementById('ws').value;
    let rh = document.getElementById('rh').value;
    let rain = document.getElementById('rain').value;

    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hour: hour, ws: ws, rh: rh, rain: rain }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('predictionResult').innerText = `Predicted Temperature: ${data.temperature}°C`;
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('predictionResult').innerText = 'An error occurred. Please try again.';
    });
});
