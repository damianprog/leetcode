## 9. Analiza złożoności — warsztat od podstaw (drabinka pętli)

> Sesja 02.09.2026. Materiał budowany od zera, nie przy okazji zadania.
> Kolejność: dokładna liczba obrotów → wyrażenie symboliczne → dopiero potem `O()`.

### 9.1 Zasada porządkowa

**Najpierw dokładna liczba, potem `O()`.** `O()` to świadome wyrzucenie informacji — nie ma czego wyrzucać, dopóki nie masz dokładnego wyrażenia. Skakanie od razu do `O()` maskuje fencepost i błędne granice.

**Odpowiedź jest wyrażeniem, nie liczbą.** Policzenie „13 obrotów dla tego wejścia" to sanity check. Złożoność to funkcja, do której podstawiasz rozmiar wejścia.

### 9.2 Procedura na każdą pętlę (trzy kroki)

1. Weź konkretne małe `n` i **wypisz wartości**, jakie przyjmie licznik.
2. Nazwij **pierwszą i ostatnią** wartość symbolem (nie liczbą).
3. Podstaw do wzoru: `ostatnia - pierwsza + 1`.

Krok 1 nie jest opcjonalny. Liczenie w pamięci to miejsce, w którym powstaje fencepost.

### 9.3 Liczenie elementów — fundament

| pytanie                                        | wzór        |
| ---------------------------------------------- | ----------- |
| ile liczb od `0` do `M` włącznie               | `M + 1`     |
| ile liczb od `a` do `b` włącznie               | `b - a + 1` |
| ile elementów `0, k, 2k, …` przy warunku `< n` | `⌈n / k⌉`   |

**Skąd sufit:** ostatni, niepełny krok też wymaga obrotu. 10 osób, winda na 3 → 4 kursy; dziesiąta jedzie sama, ale jedzie. Sufit **nic nie zmienia wtedy i tylko wtedy, gdy `k` dzieli `n` bez reszty**.

### 9.4 Karta A — pętle proste

| pętla                    | obrotów     |
| ------------------------ | ----------- |
| `i = 0; i < n; i++`      | `n`         |
| `i = 0; i <= n; i++`     | `n + 1`     |
| `i = 1; i < n; i++`      | `n - 1`     |
| `i = 0; i <= n - m; i++` | `n - m + 1` |
| `i = 0; i < n; i += k`   | `⌈n / k⌉`   |

Trzy odruchy:

- **`<=` dokłada dokładnie jeden obrót** względem `<`. Efekty „warunek" i „start" są niezależne i sumują się.
- **Liczy się ostatnia wartość, która przeszła warunek** — nie ta, na której pętla stanęła. Przy `i < 10; i += 3` ostatni obrót to `i = 9`; `i = 12` to wartość, przy której pętla **kończy**, nie kolejny obrót.
- `i <= X` daje `X + 1` obrotów, **cokolwiek siedzi w `X`** — łącznie z wyrażeniem typu `n - m`.

### 9.5 Karta B — pętle złożone

| kształt                          | obrotów ciała    |
| -------------------------------- | ---------------- |
| zagnieżdżone niezależne          | `n · m`          |
| obok siebie                      | `n + m`          |
| wewnętrzna o stałej długości `k` | `n · k` → `O(n)` |
| wewnętrzna zależna (`j = i`)     | `(n² + n) / 2`   |

**Zagnieżdżone mnożysz, obok siebie dodajesz.**

**`n · m` vs `n · k` — różnica jest w naturze czynnika, nie w kształcie kodu.** Kryterium: _czy ta wielkość może urosnąć, gdy dostanę większe wejście?_ Jeśli tak — parametr, zostaje. Jeśli nie (26 liter, 16 bitów, ustalone `k`) — stała, wypada pod `O()`.

### 9.6 Suma `1 + 2 + … + n` — wyprowadzenie do zapamiętania

Pętla zależna `for (j = i; j < n; j++)` robi kolejno `n, n-1, …, 2, 1` obrotów.

1. **Paruj od końców:** `n + 1`, `(n-1) + 2`, `(n-2) + 3`. Wszystkie równe, bo z lewej odejmujesz 1, z prawej dodajesz 1 — znoszą się.
2. **Wartość pary:** `n + 1`.
3. **Liczba par:** `n / 2` (każda para zjada dwie liczby).
4. **Suma:** `(n / 2) · (n + 1) = (n² + n) / 2`.

Dla nieparzystego `n` środkowa liczba zostaje bez pary, ale wzór działa — `n/2` wychodzi ułamkiem i rachunek się domyka (`n = 5`: `2.5 · 6 = 15`).

**Interpretacja:** to liczba **par elementów** w tablicy `n`-elementowej — każdy z każdym, bez powtórek. Stąd ten wzór przy naiwnym two-sum, szukaniu duplikatów przez porównania, bubble sorcie.

**Skala:** przy podwojeniu `n` praca rośnie **prawie** 4× (`5050 → 20100`). „Prawie", bo `n²` rośnie 4×, a składnik `n` tylko 2× — i właśnie dlatego `n` odpada pod `O()`, zostaje `O(n²)`.

### 9.7 Co pomaga, gdy analiza się zacina

- **Tabelka wejście → wyjście.** Dwa wiersze z różnymi wartościami i pytanie „jaka operacja łączy kolumny w obu wierszach". To działa lepiej niż jakiekolwiek wyjaśnienie.
- **Konfrontacja wzoru z własnym wyliczeniem.** Wzór dał 5, ręczna lista ma 4 elementy → wzór jest zły. Ten odruch wyłapał fałszywe `+1` w `⌈n/k⌉`.
- **Dwie wersje kodu obok siebie** zamiast metafory geometrycznej. Tabelka „`i` → wartości `j` → obrotów" dla `j = 0` i dla `j = i` pokazuje różnicę wprost; rysunek kwadratu z przekątną — nie.
- **Konkretny przykład z życia przy nowym pojęciu** (winda i sufit, wydawanie połowy pieniędzy i `n - n/2`).
