document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    const socialContainer = document.getElementById('social-container');

    const socialProfiles = [
        {
            name: 'Johana Ale',
            profiles: [
                { class: 'fab fa-github', link: 'https://github.com/JohanaAle' },
                { class: 'fab fa-whatsapp', link: 'https://wa.me/+5493813460606 ' },
                { class: 'fa fa-envelope', link: 'mailto: Johanaale75@gmail.com ' }
            ]
        },
        {
            name: 'Diego Pizarro',
            profiles: [
                { class: 'fab fa-github', link: 'https://github.com/https://github.com/diegoandrespizarro' },
                { class: 'fab fa-whatsapp', link: 'https://wa.me/+5493329616216' },
                { class: 'fa fa-envelope', link: 'mailto:diego.pizarro1986@gmail.com' }
            ]
        },
        {
            name: 'Ramiro Sorroza',
            profiles: [
                { class: 'fab fa-github', link: 'https://github.com/RamiSorroza' },
                { class: 'fab fa-whatsapp', link: 'https://wa.me/+5493813028005' },
                { class: 'fa fa-envelope', link: 'mailto: ramirosorroza@gmail.com' }
            ]
        }
    ];

    socialProfiles.forEach(profile => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'red-social-item';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'nombre';
        nameSpan.textContent = profile.name;
        itemDiv.appendChild(nameSpan);

        profile.profiles.forEach(social => {
            const a = document.createElement('a');
            a.href = social.link;
            a.target = '_blank';
            a.className = social.class;
            itemDiv.appendChild(a);
        });

        socialContainer.appendChild(itemDiv);
    });
});
