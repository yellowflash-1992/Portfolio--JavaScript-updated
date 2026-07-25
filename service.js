document.addEventListener('DOMContentLoaded', () => {
    const wrappers = document.querySelectorAll('.input-group');

    wrappers.forEach(wrapper => {

        const toggleBtn = wrapper.querySelector('.dropdown-toggle');
        const menu = wrapper.querySelector('.dropdown-menu');
        const input = wrapper.querySelector('.form-control');




        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');
            wrapper.classList.toggle('dropdown-open');

        });

        menu.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown-item')) {
                e.preventDefault();

                //optional
                input.value = e.target.textContent.trim();

                menu.classList.remove('show');
                wrapper.classList.remove('dropdown-open');
            }
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
        });

        document.querySelectorAll('.input-group.dropdown-open').forEach(wrapper => {
            wrapper.classList.remove('dropdown-open');
        });
    });
});