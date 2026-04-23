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

// PRZETWARZANIE ZDJĘCIA
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

// PRZYCISK "WEJDŹ"
const goBtn = document.querySelector(".go");
if (goBtn) {
  goBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Zatrzymaj domyślne działanie
    
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

    // Zbieranie daty
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");

    [day, month, year].forEach((input) => {
      if (input && isEmpty(input.value)) {
        const dateBox = document.querySelector(".date");
        if (dateBox) dateBox.classList.add("error_shown");
        empty.push(input);
      } else if (input) {
        data[input.id] = input.value;
      }
    });

    // Zbieranie reszty pól (imię, nazwisko, pesel itp.)
    document.querySelectorAll(".input_holder").forEach((element) => {
      var input = element.querySelector(".input");
      if (input && isEmpty(input.value)) {
        empty.push(element);
        element.classList.add("error_shown");
      } else if (input) {
        data[input.id] = input.value;
      }
    });

    // Jeśli są puste pola, przewiń do nich. Jeśli nie - leć dalej!
    if (empty.length != 0) {
      empty[0].scrollIntoView({ behavior: 'smooth' });
    } else {
      // ZAPIS LOKALNY
      localStorage.setItem('userData', JSON.stringify(data));
      
      // PRZEJŚCIE DO LOGOWANIA (z kropką na początku dla Vercela)
      window.location.href = "./id.html";
    }
  });
}

function isEmpty(value) {
  return /^\s*$/.test(value || "");
}

// Obsługa instrukcji (guide)
var guide = document.querySelector(".guide_holder");
if (guide) {
  guide.addEventListener("click", () => {
    guide.classList.toggle("unfolded");
  });
}

