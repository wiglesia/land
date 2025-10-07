 // === MENÚ MÓVIL ===
        const menuBtn = document.getElementById("menu-btn");
        const navMenu = document.getElementById("nav-menu");
        
        const closeMenu = () => {
             menuBtn.classList.remove("open");
             navMenu.classList.remove("active");
        };
        
        menuBtn.addEventListener("click", () => {
            menuBtn.classList.toggle("open");
            navMenu.classList.toggle("active");
        });
        document.querySelectorAll("#nav-menu li a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // === ANIMACIÓN DE CARDS (Misma que antes) ===
        const cards = document.querySelectorAll(".card");
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold:0.2});
        cards.forEach(card => observer.observe(card));

        // === NOTIFICACIONES ALEATORIAS (Misma que antes) ===
        const nombres = ["Jor** ****", "Mar**** ******", "Luc*** ****", "Car*** *****", "Mar*** ****", "Ped** ******", "Sof** ****", "Die** ******"];
        const acciones = [
            "solicitó un Diseño Web 🌐",
            "pidió un Currículum Profesional 💼",
            "envio documentos para impresiones 📄",
            "consultó por un logo 🎨",
            "pidió ayuda con un trámite 📝",
            "solicito asistencia para su web 📲",
            "consultó por una tarjeta de invitacion 🎨",
            "consulto por una planilla en excel 📄",
            "solicito presupuesto para su pagina web 🌐"
        ];
        const ubicaciones = ["Iglesia","San Juan"];

        function generarNotificacion() {
            const notif = document.getElementById("notification");
            if (!notif) return;
            const nombre = nombres[Math.floor(Math.random()*nombres.length)];
            const accion = acciones[Math.floor(Math.random()*acciones.length)];
            const ubicacion = ubicaciones[Math.floor(Math.random()*ubicaciones.length)];
            notif.innerHTML = `<strong>${nombre}</strong> en ${ubicacion} ${accion}`;
            notif.classList.add("show");
            setTimeout(()=>notif.classList.remove("show"),6000);
        }
        setTimeout(generarNotificacion,15000);
        setInterval(generarNotificacion,Math.random()*(30000-15000)+15000);

        // === BOTONES FLOTANTES (Lógica de expansión Desktop / Navegación Móvil) ===
        const floatBtns = document.querySelectorAll(".float-buttons a");

        floatBtns.forEach(btn => {
            const originalHref = btn.getAttribute('data-href');
            
            btn.addEventListener("click", function(e) {
                // Si la pantalla es móvil, solo navegamos (no hay expansión)
                if (window.innerWidth <= 768) {
                    window.open(originalHref, '_blank');
                    return;
                }
                
                // Lógica de expansión para Desktop
                if (!this.classList.contains("active")) {
                    e.preventDefault(); 
                    
                    // Cierra los demás antes de expandir este
                    floatBtns.forEach(b => b.classList.remove("active"));
                    
                    this.classList.add("active");
                } else {
                    // Si ya estaba activo, navegamos al link (click por segunda vez)
                    window.open(originalHref, '_blank');
                    this.classList.remove("active");
                }
            });
        });

        // Cierra los botones si se hace click fuera (Desktop)
        document.addEventListener("click", function(e) {
            if (window.innerWidth > 768 && !e.target.closest(".float-buttons") && !e.target.closest("#menu-btn")) {
                floatBtns.forEach(btn => btn.classList.remove("active"));
            }
        });
