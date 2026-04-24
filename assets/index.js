// Czekamy, aż cała strona się załaduje
document.addEventListener("DOMContentLoaded", () => {
    const goBtn = document.querySelector(".go");

    if (goBtn) {
        goBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // 1. Pobieranie wartości z pól formularza
            // Upewnij się, że w index.html masz <input id="name"> itd.
            const nameField = document.getElementById("name");
            const surnameField = document.getElementById("surname");
            const dayField = document.getElementById("day");
            const monthField = document.getElementById("month");
            const yearField = document.getElementById("year");

            if (!nameField || !surnameField || !dayField) {
                alert("Błąd: Nie znaleziono pól formularza. Sprawdź ID w pliku index.html");
                return;
            }

            const name = nameField.value.trim().toUpperCase();
            const surname = surnameField.value.trim().toUpperCase();
            const d = dayField.value.toString().padStart(2, '0');
            const m = monthField.value.toString().padStart(2, '0');
            const y = yearField.value.toString();

            // 2. GENEROWANIE NUMERU PESEL
            let p_month = parseInt(m);
            // Dla osób urodzonych w roku 2000 i później, do miesiąca dodaje się 20
            if (parseInt(y) >= 2000) {
                p_month += 20;
            }
            
            const p_year = y.slice(-2); // ostatnie dwie cyfry roku
            const p_month_str = p_month.toString().padStart(2, '0');
            const p_day = d;
            
            // Losujemy końcówkę PESEL (5 cyfr)
            const randomDigits = Math.floor(10000 + Math.random() * 90000);
            const generatedPesel = p_year + p_month_str + p_day + randomDigits;

            // 3. POBIERANIE ZDJĘCIA
            // Skrypt szuka elementu z klasą .upload, który przechowuje wybrane zdjęcie
            const uploadElement = document.querySelector(".upload");
            let imageData = "";
            if (uploadElement) {
                imageData = uploadElement.getAttribute("selected") || "";
            }

            // 4. PRZYGOTOWANIE PACZKI DANYCH
            const userData = {
                name: name,
                surname: surname,
                day: d,
                month: m,
                year: y,
                pesel: generatedPesel,
                // Generujemy losową serię (3 litery) i numer (6 cyfr)
                seriesAndNumber: "ABC " + Math.floor(100000 + Math.random() * 900000),
                expiryDate: "24.04.2036",
                givenDate: "24.04.2024",
                image: imageData
            };

            // 5. ZAPISYWANIE W PAMIĘCI PRZEGLĄDARKI
            localStorage.setItem('userData', JSON.stringify(userData));

            // 6. PRZEJŚCIE DO KARTY
            // Upewnij się, że plik z kartą nazywa się dokładnie card.html
            window.location.href = "card.html";
        });
    } else {
        console.error("Nie znaleziono przycisku z klasą .go");
    }
});
