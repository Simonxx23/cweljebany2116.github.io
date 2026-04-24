// --- 1. ZMIENNE I OBSŁUGA INTERFEJSU ---
var selector = document.querySelector(".selector_box");
if (selector) {
  selector.addEventListener("click", () => {
    selector.classList.toggle("selector_open");
  });
}

document.querySelectorAll(".date_input").forEach((element) => {
  element.addEventListener("click", () => {
    const dateBox = document.querySelector(".date");
    if (dateBox) dateBox.classList.remove("error_shown");
  });
});

var sex = "m";

document.querySelectorAll(".selector_option").forEach((option) => {
  option.addEventListener("click", () => {
    sex = option.id;
    const selectedText = document.querySelector(".selected_text");
    if (selectedText) selectedText.innerHTML = option.innerHTML;
  });
});

// --- 2. OBSŁUGA ZDJĘCIA ---
var upload = document.querySelector(".upload");
var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";

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

// --- 3. FUNKCJA ZAPAMIĘTYWANIA (POWRÓT NA STRONĘ) ---
document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        const data = JSON.parse(savedData);

        // Wypełnianie pól tekstowych
        Object.keys(data).forEach(key => {
            const input = document.getElementById(key);
            if (input && key !== 'image' && key !== 'sex') {
                input.value = data[key];
            }
        });

        // Przywracanie płci
        if (data.sex) {
            sex = data.sex;
            const selectedText = document.querySelector(".selected_text");
            if (selectedText) {
                selectedText.innerHTML = (sex === 'm') ? 'Mężczyzna' : 'Kobieta';
            }
        }

        // Przywracanie zdjęcia
        if (data.image && upload) {
            upload.setAttribute("selected", data.image);
            upload.classList.add("upload_loaded");
            const imgPreview = upload.querySelector(".upload_uploaded");
            if (imgPreview) imgPreview.src = data.image;
        }
    }
});

// --- 4. PRZYCISK "WEJDŹ" + GENERATOR PESEL ---
const goBtn = document.querySelector(".go");
if (goBtn) {
  goBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    var empty = [];
    var data = {};
    data["sex"] = sex;
    
    // Walidacja zdjęcia
    if (upload && !upload.hasAttribute("selected")) {
      empty.push(upload);
      upload.classList.add("error_shown");
    } else if (upload) {
      data["image"] = upload.getAttribute("selected");
    }

    // Pobieranie daty i tworzenie PESEL
    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    if (isEmpty(dayInput.value) || isEmpty(monthInput.value) || isEmpty(yearInput.value)) {
        const dateBox = document.querySelector(".date");
        if (dateBox) dateBox.classList.add("error_shown");
        empty.push(dayInput);
    } else {
        data["day"] = dayInput.value;
        data["month"] = monthInput.value;
        data["year"] = yearInput.value;

        // Generator PESEL zgodny z datą
        const yearStr = yearInput.value.toString();
        const yearPart = yearStr.slice(-2);
        const monthPart = monthInput.value.toString().padStart(2, '0');
        const dayPart = dayInput.value.toString().padStart(2, '0');
        const randomPart = Math.floor(10000 + Math.random() * 90000); 
        
        let peselMonth = parseInt(monthPart);
        if (parseInt(yearStr) >= 2000) peselMonth += 20;
        const finalMonth = peselMonth.toString().padStart(2, '0');

        data["pesel"] = yearPart + finalMonth + dayPart + randomPart;
    }

    // Reszta pól (imię, nazwisko, itd.)
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
      // Zapis i przejście
      localStorage.setItem('userData', JSON.stringify(data));
      window.location.href = "./id.html";
    }
  });
}

function isEmpty(value) {
  return /^\s*$/.test(value || "");
}
