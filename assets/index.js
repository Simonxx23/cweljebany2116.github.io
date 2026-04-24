    if (empty.length != 0) {
      empty[0].scrollIntoView({ behavior: 'smooth' });
    } else {
      // Zapisujemy wszystko w pamięci przeglądarki
      localStorage.setItem('userData', JSON.stringify(data));
      
      // KLUCZOWA ZMIANA: Przekierowanie prosto do karty
      window.location.href = "./card.html"; 
    }
