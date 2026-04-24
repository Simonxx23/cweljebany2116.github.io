document.querySelector(".go").addEventListener("click", (e) => {
    e.preventDefault();

    // 1. Pobieranie danych z pól formularza
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const d = document.getElementById("day").value;
    const m = document.getElementById("month").value;
    const y = document.getElementById("year").value;

    // 2. GENEROWANIE PESEL (automatyczne na podstawie daty)
    let p_month = parseInt(m);
    // Dla osób urodzonych po 2000 roku dodajemy 20 do miesiąca (system PESEL)
    if (parseInt(y) >= 2000) p_month += 20;
    
    const p_year = y.toString().slice(-2); // ostatnie 2 cyfry roku
    const p_day = d.padStart(2, '0');
    const p_month_str = p_month.toString().padStart(2, '0');
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // losowa końcówka
    
    const generatedPesel = p_year + p_month_str + p_day + randomDigits;

    // 3. PRZYGOTOWANIE PACZKI DANYCH
    const userData = {
        name: name,
        surname: surname,
        day: d,
        month: m,
        year: y,
        pesel: generatedPesel,
        // Generujemy losową serię i numer dowodu dla realizmu
        seriesAndNumber: "ABC " + Math.floor(100000 + Math.random() * 900000),
        expiryDate: "24.04.2036",
        givenDate: "24.04.2024",
        // Pobieramy zdjęcie, które wgrałeś w formularzu
        image: document.querySelector(".upload").getAttribute("selected

