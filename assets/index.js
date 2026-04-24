const goBtn = document.querySelector(".go");

if (goBtn) {
    goBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // Pobieranie wartości z pól
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const day = document.getElementById("day").value;
        const month = document.getElementById("month").value;
        const year = document.getElementById("year").value;

        // --- GENERATOR PESEL ---
        let p_month = parseInt(month);
        let p_year = year.toString().slice(-2); // ostatnie 2 cyfry roku
        
        // Jeśli ktoś urodził się po 2000 roku, do miesiąca dodajemy 20
        if (parseInt(year) >= 2000) {
            p_month = p_month + 20;
        }

        const p_day = day.toString().padStart(2, '0');
        const p_month_str = p_month.toString().padStart(2, '0');
        
        // Losowe 5 cyfr na końcu PESELU
        const randomDigits = Math.floor(10000 + Math.random() * 90000);
        
        const generatedPesel = p_year + p_month_str + p_day + randomDigits;
        // ------------------------

        // Przygotowanie paczki danych
        const userData = {
            name: name,
            surname: surname,
            day: day,
            month: month,
            year: year,
            pesel: generatedPesel, // Tutaj trafia gotowy PESEL
            seriesAndNumber: "ABC " + Math.floor(100000 + Math.random() * 900000),
            image: document.querySelector(".upload").getAttribute("selected")
        };

        // Zapisywanie do pamięci telefonu
        localStorage.setItem('userData', JSON.stringify(userData));

        // Przejście do karty
        window.location.href = "card.html";
    });
}

