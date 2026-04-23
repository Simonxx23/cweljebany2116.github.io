// Obsługa rozwijanego menu (Płeć)
var selector = document.querySelector(".selector_box");
if (selector) {
  selector.addEventListener("click", () => {
    selector.classList.toggle("selector_open");
  });
}

// Usuwanie błędów przy kliknięciu w datę
document.querySelectorAll(".date_input").forEach((element) => {
  element.addEventListener("click", () => {
    const dateBox = document.querySelector(".date");
    if (dateBox) dateBox.classList.remove("error_shown");
  });
});

var sex = "m";

// Wybór opcji płci
document.querySelectorAll(".selector_option").forEach((option) => {
  option.addEventListener("click", () => {
    sex = option.id;
    const selectedText = document.querySelector(".selected_text");
    if (selectedText) selectedText.innerHTML = option.innerHTML;
  });
});

// Obsługa zdjęcia
var upload = document.querySelector(".upload");
var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";

// Usuwanie błędów przy polach tekstowych
document.querySelectorAll(".input_holder").forEach((element) => {
  var input = element.querySelector(".input");
  if (input) {
    input.addEventListener("click", () => {
      element.classList.remove("error_shown");
    });
  }
});

if (upload) {
  upload.addEventListener("click", () => {
    imageInput.click();
    upload.classList.remove("error_shown");
  });
}

// PRZETWARZANIE ZDJĘCIA (Lokalne)
imageInput.addEventListener("change", (event) => {
  if (upload) {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
  }

  var file = imageInput.files[0];
  var reader = new FileReader();
  
  reader.onload = (e) => {
    var url = e.target.result;
    if (upload) {
      upload.setAttribute("selected", url);
      upload.classList.remove("upload_loading");
      upload.classList.add("upload_loaded");
      const imgPreview = upload.querySelector(".upload_uploaded");
      if (imgPreview) imgPreview.src = url;
    }
  };
  reader.readAsDataURL(file);
});

// PRZYCISK "WEJDŹ" + GENERATOR PESEL
const goBtn = document.querySelector(".go");
if (goBtn) {
  goBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    var empty = [];
    var data = {};

    data["sex"] = sex;
    
    // Zdjęcie
    if (upload && !upload.hasAttribute("selected")) {
      empty.push(upload);
      upload.classList.add("error_shown");
    } else if (upload) {
      data["image"] = upload.getAttribute("selected");
    }

    // Pobieranie daty urodzenia i tworzenie PESEL
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");

    if (isEmpty(day.value) || isEmpty(month.value) || isEmpty(year.value)) {
        const dateBox = document.querySelector(".date");
        if (dateBox) dateBox.classList.add("error_shown");
        empty.push(day);
    } else {
        data["day"] = day.value;
        data["month"] = month.value;
        data["year"] = year.value;

        // --- DYNAMICZNY PESEL ---
        const yearStr = year.value.toString();
        const yearPart = yearStr.slice(-2); // ostatnie dwie cyfry roku
        const monthPart = month.value.toString().padStart(2, '0');
        const dayPart = day.value.toString().padStart(2, '0');
        
        // Dodajemy 5 losowych cyfr na końcu
        const randomPart = Math.floor(10000 + Math.random() * 90000); 
        
        // Jeśli rok >= 2000, do miesiąca dodajemy 20 (zasada PESEL)
        let peselMonth = parseInt(monthPart);
        if (parseInt(yearStr) >= 2000) {
            peselMonth += 20;
        }
        const finalMonth = peselMonth.toString().padStart(2, '0');

        data["pesel"] = yearPart + finalMonth + dayPart + randomPart;
    }

    // Zbieranie reszty pól
    document.querySelectorAll(".input_holder").forEach((element) => {
      var input = element.querySelector(".input");
      if (input && isEmpty(input.value)) {
        empty.push(element);
        element.classList.add("error_shown");
      } else if (input) {
        data[input.id] = input.value;
      }
    });

    if (empty.length != 0) {
      empty[0].scrollIntoView({ behavior: 'smooth' });
    } else {
      // Zapisujemy wszystko w pamięci przeglądarki
      localStorage.setItem('userData', JSON.stringify(data));
      
      // Przekierowanie do id.html (ekran logowania)
      window.location.href = "./id.html";
    }
  });
}

function isEmpty(value) {
  return /^\s*$/.test(value || "");
}


