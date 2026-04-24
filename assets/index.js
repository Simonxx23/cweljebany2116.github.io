document.querySelector(".go").addEventListener("click", (e) => {
    e.preventDefault();
    const d = document.getElementById("day").value;
    const m = document.getElementById("month").value;
    const y = document.getElementById("year").value;

    // Generowanie PESELU
    let p_month = parseInt(m);
    if (parseInt(y) >= 2000) p_month += 20;
    const pesel = y.toString().slice(-2) + p_month.toString().padStart(2, '0') + d.padStart(2, '0') + Math.floor(10000 + Math.random() * 90000);

    const userData = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        day: d, month: m, year: y,
        pesel: pesel,
        seriesAndNumber: "ABC " + Math.floor(100000 + Math.random() * 900000),
        image: document.querySelector(".upload").getAttribute("selected")
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.href = "card.html";
});
