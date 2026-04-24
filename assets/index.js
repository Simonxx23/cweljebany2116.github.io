document.querySelector(".go").addEventListener("click", (e) => {
    e.preventDefault();
    
    // Pobieranie daty
    const d = document.getElementById("day").value.padStart(2, '0');
    const m = document.getElementById("month").value.padStart(2, '0');
    const y = document.getElementById("year").value;

    // Obliczanie PESEL
    let p_month = parseInt(m);
    if (parseInt(y) >= 2000) p_month += 20;
    const p_year = y.slice(-2);
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    
    const finalPesel = p_year + p_month.toString().padStart(2, '0') + d + randomDigits;

    // Pakowanie danych
    const userData = {
        name: document.getElementById("name").value.toUpperCase(),
        surname: document.getElementById("surname").value.toUpperCase(),
        birthday: d + "." + m + "." + y,
        pesel: finalPesel, // To musi się nazywać "pesel"
        image: document.querySelector(".upload").getAttribute("selected") || ""
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.href = "card.html";
});

