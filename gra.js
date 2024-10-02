// Poniżej mamy zaimplementowaną mechanikę pokazywania i zwijania listy zasad

function pokazZasady() {
  $(".zasady").css("display", "block");
  $("#pokazZasady").html("Aby zwinąć zasady kliknij tutaj!");
  $("#pokazZasady").attr("id", "zwinZasady");
}

function zwinZasady() {
  $(".zasady").css("display", "none");
  $("#zwinZasady").html("Aby poznać zasady kliknij tutaj!");
  $("#zwinZasady").attr("id", "pokazZasady");
}

$(document).on("click", "#pokazZasady", function () {
  pokazZasady();
});

$(document).on("click", "#zwinZasady", function () {
  zwinZasady();
});

// Poniżej mamy zaimplementowaną mechanikę dodawania i wyświetlania gracza
// W tym celu dodajemy klasę Gracz, w ramach której wprowadzimy imię graczę, metodę do pokazania gracza i możliwość jego usunięcia
// Stwórzmy też tablicę, do której dodawać będziemy graczy, aby prościej ich potem wyświetlać na ekranie

let iloscGraczy = 0;
let nastepneIdGracza = 0;
let gracze = new Array();

class Gracz {
  constructor(nazwaGracza) {
    this.nazwaGracza = nazwaGracza;
    this.idGracza = "gracz" + nastepneIdGracza;
    nastepneIdGracza++;
  }

  pokazGracza() {
    $(".gracze").append(
      `<div id="container${this.idGracza}" class="gracz-container">
        <span class="nowyGracz">${this.nazwaGracza}</span>
        <button type="submit" class="usunGracza przycisk" id="${this.idGracza}">Usuń Gracza</button>
      </div>`
    );
  }

  usunGracza() {
    $(`#${this.idGracza}`).remove();
  }
}

// Następnie będziemy pobierać inputa wprowadzonego przez użytkownika i dodawać obkiet nowego gracza
// Walidację: 1) Nazwa gracza ma od 3 do 15 znaków 2) Ilość graczy nie jest większa od pięciu 3) Gracz o podanej nazwie nie istnieje w tablicy
// Dodatkowo po wprowadzeniu gracza czyścimy value pola, aby na nowo trzeba było je wpisać

document.querySelector(".dodajGracza").addEventListener("click", function () {
  let nazwaGracza = document.getElementById("nazwaGracza").value;

  if (
    nazwaGracza.length >= 3 &&
    nazwaGracza.length <= 15 &&
    iloscGraczy < 5 &&
    weryfikacjaIstnieniaGracza(nazwaGracza) != true
  ) {
    let nowyGracz = new Gracz(nazwaGracza);
    gracze.push(nowyGracz);
    nowyGracz.pokazGracza();
    document.getElementById("nazwaGracza").value = "";
    iloscGraczy++;
  } else if (nazwaGracza.length < 3 || nazwaGracza.length > 15) {
    alert(
      "Wprowadzono niepoprawną nazwę gracza! Nazwa musi się składać przynajmniej z trzech znaków i nie może przekraczać 15 znaków"
    );
  } else if (weryfikacjaIstnieniaGracza(nazwaGracza) == true) {
    alert("Gracz o podanej nazwie już istnieje!");
  } else {
    alert("Wprowadzono zbyt dużą ilość graczy!");
  }
});

// Potrzebujemy stworzyć funkcję, która sprawdzi, czy gracz o podanej nazwie nie istnieje już w tablicy gracze

function weryfikacjaIstnieniaGracza(nazwaNowegoGracza) {
  for (gracz of gracze) {
    if (gracz.nazwaGracza === nazwaNowegoGracza) {
      return true;
    }
  }
  return false;
}

// robimy uchwyt na kliknięcie w przycisk usuń gracza i robimy funkcję, która go usunie - uchwyt ma funkcję anonimową, która wywyłuje z argumentem przygotowaną przeze mnie funkcję

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("usunGracza")) {
    usuwanieGracza(event.target.id);
  }
});

function usuwanieGracza(idGraczaDoUsuniecia) {
  gracze = gracze.filter((gracz) => gracz.idGracza !== idGraczaDoUsuniecia);
  document.getElementById(`container${idGraczaDoUsuniecia}`).remove();
  iloscGraczy--;
  console.log(gracze);
}

// Tworzymy grę

document.querySelector(".RozpocznijGrę").addEventListener("click", function () {
  if (iloscGraczy > 0) {
    rozpocznijRozgrywke();
  } else {
    alert(
      "Aby wystartować rozgrywkę musisz dodać przynajmniej jednego gracza!"
    );
  }
});

function rozpocznijRozgrywke() {
  alert("Zaczniemy grę, jak ją okoduję :)");
  document.querySelector(".dodawanieGracza").style.display = "none";
  document.querySelector(".gracze").style.display = "none";
  document.querySelector(".RozpocznijGrę").style.display = "none";
  document.getElementById("nagłówek").innerHTML =
    "Generał - najlepsza gra w kości";
  document.getElementById("pokazZasady").style.display = "none";
}
