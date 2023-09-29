document.addEventListener("DOMContentLoaded", function () {
    const originalUrlInput = document.getElementById("originalUrl");
    const shortenButton = document.getElementById("shortenButton");
    const resetButton = document.getElementById("resetButton");
    const errorText = document.getElementById("errorText");
    const shortenedUrlDisplay = document.getElementById("shortenedUrlDisplay");

    const urlMappings = {}; // In-memory storage for URL mappings

    shortenButton.addEventListener("click", function () {
        errorText.textContent = "";

        const originalUrl = originalUrlInput.value;
        if (isValidUrl(originalUrl)) {
            if (urlMappings[originalUrl]) {
                const shortUrl = urlMappings[originalUrl];
                shortenedUrlDisplay.innerHTML = `<strong>Shortened URL:</strong> <a href="${originalUrl}" target="_blank">${shortUrl}</a>`;
            } else {
                const shortCode = generateShortCode();
                const shortUrl = `short.url/${shortCode}`;
                urlMappings[originalUrl] = shortUrl;
                shortenedUrlDisplay.innerHTML = `<strong>Shortened URL:</strong> <a href="${originalUrl}" target="_blank">${shortUrl}</a>`;
            }
        } else {
            errorText.textContent = "Invalid URL. Please enter a valid URL.";
        }
    });

    resetButton.addEventListener("click", function () {
        originalUrlInput.value = "";
        errorText.textContent = "";
        shortenedUrlDisplay.textContent = "";
    });

    function isValidUrl(url) {
        const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
        return urlPattern.test(url);
    }

    function generateShortCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 6;
        let shortCode = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            shortCode += characters.charAt(randomIndex);
        }
        return shortCode;
    }
});