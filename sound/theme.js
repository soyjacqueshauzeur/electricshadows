(function () {
    const html = document.documentElement;
    const body = document.body;

    function getTimeBasedTheme() {
        const hour = new Date().getHours();
        return (hour >= 6 && hour < 18) ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            html.classList.add('dark');
            html.classList.remove('light');
            body.classList.remove('bg-gray-50', 'text-gray-900');
            body.classList.add('bg-background', 'text-on-surface');
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
            body.classList.remove('bg-background', 'text-on-surface');
            body.classList.add('bg-gray-50', 'text-gray-900');
        }
    }

    const savedTheme = localStorage.getItem('rythm-theme');
    const initialTheme = savedTheme || getTimeBasedTheme();
    applyTheme(initialTheme);

    document.addEventListener('DOMContentLoaded', function () {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const themeIcon = themeToggle.querySelector('.theme-icon');
        const surpriseEmojis = ['✨', '🎉', '🌟', '💫', '🔮', '🎆', '💥', '🌈', '🦄', '🐉'];
        const lightIcon = '☀️';
        const darkIcon = '🌙';

        let currentTheme = initialTheme;
        let isToggling = false;

        themeIcon.textContent = currentTheme === 'dark' ? darkIcon : lightIcon;

        themeToggle.addEventListener('click', function () {
            if (isToggling) return;
            isToggling = true;

            let rotation = 0;
            let emojiIndex = 0;

            const surpriseInterval = setInterval(function () {
                rotation += 180;
                themeIcon.style.transform = 'rotate(' + rotation + 'deg)';
                themeIcon.textContent = surpriseEmojis[emojiIndex];
                emojiIndex = (emojiIndex + 1) % surpriseEmojis.length;
            }, 80);

            setTimeout(function () {
                clearInterval(surpriseInterval);

                currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
                applyTheme(currentTheme);
                themeIcon.textContent = currentTheme === 'dark' ? darkIcon : lightIcon;

                rotation += 360;
                themeIcon.style.transform = 'rotate(' + rotation + 'deg)';

                setTimeout(function () {
                    themeIcon.style.transform = 'rotate(0deg)';
                }, 300);

                localStorage.setItem('rythm-theme', currentTheme);
                isToggling = false;
            }, 800);
        });
    });
})();
