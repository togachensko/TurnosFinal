const es = {
    today: "hola"
}
new tempusDominus.TempusDominus(document.getElementById('multipleDate'), {
    multipleDates: true,
    display: {
        inline: true
    }
});


new tempusDominus.TempusDominus(document.getElementById('horarios-desde'), {
    display: {
        viewMode: 'clock',
        components: {
            decades: false,
            year: false,
            month: false,
            date: false,
            hours: true,
            minutes: true,
            seconds: false
        }
    }
});

new tempusDominus.TempusDominus(document.getElementById('horarios-hasta'), {
    display: {
        viewMode: 'clock',
        components: {
            decades: false,
            year: false,
            month: false,
            date: false,
            hours: true,
            minutes: true,
            seconds: false
        }
    }
});