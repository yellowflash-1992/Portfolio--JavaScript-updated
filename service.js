document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".theme-toggle");

    if (themeToggle) {
        const setTheme = theme => {
            const isLight = theme === "light";
            document.documentElement.dataset.theme = theme;
            themeToggle.setAttribute("aria-pressed", String(isLight));
            themeToggle.setAttribute("aria-label", isLight ? "Dark theme" : "Light theme");
            themeToggle.setAttribute("title", isLight ? "Dark theme" : "Light theme");
        };

        setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
        themeToggle.addEventListener("click", () => {
            const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
            setTheme(nextTheme);
            try {
                localStorage.setItem("yellowflash-services-theme", nextTheme);
            } catch (error) {
                console.warn("Unable to save the Services theme preference.", error);
            }
        });
    }

    const wrappers = Array.from(document.querySelectorAll(".dropdown-wrapper"));
    const form = document.querySelector(".request-form");
    const formStatus = document.getElementById("form-status");

    const setOpen = (wrapper, isOpen) => {
        const toggle = wrapper.querySelector(".dropdown-toggle");
        const input = wrapper.querySelector(".form-control");
        const menu = wrapper.querySelector(".dropdown-menu");

        menu.classList.toggle("show", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        input.setAttribute("aria-expanded", String(isOpen));
    };

    wrappers.forEach(wrapper => {
        const toggle = wrapper.querySelector(".dropdown-toggle");
        const menu = wrapper.querySelector(".dropdown-menu");
        const input = wrapper.querySelector(".form-control");

        if (!toggle || !menu || !input) {
            return;
        }

        toggle.addEventListener("click", event => {
            event.stopPropagation();
            const shouldOpen = !menu.classList.contains("show");

            wrappers.forEach(otherWrapper => {
                if (otherWrapper !== wrapper) {
                    const otherToggle = otherWrapper.querySelector(".dropdown-toggle");
                    const otherMenu = otherWrapper.querySelector(".dropdown-menu");
                    const otherInput = otherWrapper.querySelector(".form-control");

                    if (otherToggle && otherMenu && otherInput) {
                        setOpen(otherWrapper, false);
                    }
                }
            });

            setOpen(wrapper, shouldOpen);
        });

        menu.addEventListener("click", event => {
            const option = event.target.closest(".dropdown-item");

            if (!option || !menu.contains(option)) {
                return;
            }

            input.value = option.dataset.value || option.textContent.trim();
            input.removeAttribute("aria-invalid");
            menu.querySelectorAll(".dropdown-item").forEach(item => {
                item.setAttribute("aria-selected", String(item === option));
            });
            setOpen(wrapper, false);
            if (
                formStatus &&
                wrappers.every(currentWrapper => {
                    const requiredInput = currentWrapper.querySelector(".form-control[required]");
                    return !requiredInput || requiredInput.value.trim();
                })
            ) {
                formStatus.textContent = "Your request will be sent securely through Formspree.";
            }
            toggle.focus();
        });

        toggle.addEventListener("keydown", event => {
            if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
                return;
            }

            event.preventDefault();
            wrappers.forEach(otherWrapper => {
                if (otherWrapper !== wrapper) {
                    const otherToggle = otherWrapper.querySelector(".dropdown-toggle");
                    const otherMenu = otherWrapper.querySelector(".dropdown-menu");
                    const otherInput = otherWrapper.querySelector(".form-control");

                    if (otherToggle && otherMenu && otherInput) {
                        setOpen(otherWrapper, false);
                    }
                }
            });
            setOpen(wrapper, true);

            const options = menu.querySelectorAll(".dropdown-item");
            const optionToFocus = event.key === "ArrowDown" ? options[0] : options[options.length - 1];
            if (optionToFocus) {
                optionToFocus.focus();
            }
        });

        menu.addEventListener("keydown", event => {
            const options = Array.from(menu.querySelectorAll(".dropdown-item"));
            const currentIndex = options.indexOf(event.target.closest(".dropdown-item"));

            if (event.key === "Escape") {
                event.preventDefault();
                setOpen(wrapper, false);
                toggle.focus();
                return;
            }

            let nextIndex;
            if (event.key === "ArrowDown") {
                nextIndex = (currentIndex + 1) % options.length;
            } else if (event.key === "ArrowUp") {
                nextIndex = (currentIndex - 1 + options.length) % options.length;
            } else if (event.key === "Home") {
                nextIndex = 0;
            } else if (event.key === "End") {
                nextIndex = options.length - 1;
            } else {
                return;
            }

            event.preventDefault();
            if (options[nextIndex]) {
                options[nextIndex].focus();
            }
        });
    });

    const otherServiceCheckbox = document.getElementById("service-other");
    const otherServiceInput = document.getElementById("other-service");

    if (otherServiceCheckbox && otherServiceInput) {
        const updateOtherService = () => {
            otherServiceInput.disabled = !otherServiceCheckbox.checked;
            otherServiceInput.required = otherServiceCheckbox.checked;
            if (!otherServiceCheckbox.checked) {
                otherServiceInput.value = "";
            }
        };

        otherServiceCheckbox.addEventListener("change", updateOtherService);
        updateOtherService();
    }

    if (form) {
        form.addEventListener("submit", event => {
            const missingSelection = wrappers.find(wrapper => {
                const input = wrapper.querySelector(".form-control[required]");
                return input && !input.value.trim();
            });

            if (!missingSelection) {
                return;
            }

            event.preventDefault();
            const input = missingSelection.querySelector(".form-control");
            const toggle = missingSelection.querySelector(".dropdown-toggle");
            if (input) {
                input.setAttribute("aria-invalid", "true");
            }
            setOpen(missingSelection, true);
            if (toggle) {
                toggle.focus();
            }
            if (formStatus) {
                formStatus.textContent = "Please choose an option from each required dropdown.";
            }
        });
    }

    document.addEventListener("click", event => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }

        wrappers.forEach(wrapper => {
            const menu = wrapper.querySelector(".dropdown-menu");
            if (menu && !wrapper.contains(target) && menu.classList.contains("show")) {
                const toggle = wrapper.querySelector(".dropdown-toggle");
                const input = wrapper.querySelector(".form-control");

                if (toggle && menu && input) {
                    setOpen(wrapper, false);
                }
            }
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") {
            return;
        }

        const openWrapper = wrappers.find(wrapper => {
            const menu = wrapper.querySelector(".dropdown-menu");
            return menu && menu.classList.contains("show");
        });
        if (!openWrapper) {
            return;
        }

        const toggle = openWrapper.querySelector(".dropdown-toggle");
        const menu = openWrapper.querySelector(".dropdown-menu");
        const input = openWrapper.querySelector(".form-control");

        if (toggle && menu && input) {
            setOpen(openWrapper, false);
            toggle.focus();
        }
    });
});
