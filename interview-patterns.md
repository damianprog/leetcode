# interview-patterns.md

Osobista baza wzorców algorytmicznych do przygotowania do rozmów (mid JS).
Każdy wpis: kiedy stosować, klocki, pułapki, sygnały interviewera, powiązane LC.

## Spis treści

1. Tablice / Two pointers
   - 1.1 Collapse from ends (in-place filter) — LC 27
   - 1.2 Fill-from-the-end (in-place merge) — LC 88
2. Linked lists
   - 2.1 Reverse linked list — LC 206
   - 2.2 Odd Even Linked List — LC 328
   - 2.3 Half-and-reverse — LC 2130
   - 2.4 Dummy / sentinel node
3. Drzewa
   - 3.1 Bottom-up search z propagacją rezultatu — LC 236
   - 3.2 DFS — node zwraca multi-value info dla rodzica — LC 543/124/1372/687
   - 3.3 Leniwy DFS przez generator — LC 872/173/230
4. Prefix sum
   - 4.1 Prefix sum + hashmap — LC 560/437/525/974

---

## 1. Tablice / Two pointers

### 1.1 Collapse from ends (in-place filter) — LC 27 Remove Element

Idea: left/right schodzą się ku sobie. `left` = granica dobrych,
`right` = granica złych. Złe elementy wymieniane elementem z prawej.

```
while (left <= right):
  - nums[left] !== val       → left++            (lewy dobry, granica rośnie)
  - else nums[right] === val → right--           (prawy zły, granica maleje)
  - else                      → swap left<->right (lewy zły, prawy dobry)

return left   // left = LICZBA dobrych, nie indeks
```

Inwariant: `[0, left)` dobre, `(right, len)` złe.

Wariant A (swap przez przypisanie val):
`else { nums[left] = nums[right]; nums[right] = val; }`
Brak `right--` w `else` → pozycja `right` MUSI zostać oznaczona złą (= val),
inaczej `left++` policzy ją drugi raz → `left` za duże o 1.

Wariant B (czystszy, jawny right--):
`else { nums[left] = nums[right]; left++; right--; }`
`nums[right] = val` zbędne, bo `right--` od razu wyklucza tę pozycję.

Pułapki:

- `left <= right` nie `<` → inaczej element w punkcie spotkania nieobejrzany
  (`[1] val=1` zwróciłoby 1 zamiast 0).
- `if / else if / else`, nie 3x osobny `if` → inaczej w jednej iteracji odpala
  kilka gałęzi i czytasz `nums[-1]` (`undefined !== val` = true → śmieci).
- `return left`, nie `left+1` → `left` to granica/licznik, uczciwy przy 0 dobrych.
  Indeks kłamie gdy nie ma dobrego elementu, granica nie.

Testy graniczne: `[]` | `[1] val=1 → 0` | `[3] val=1 → 1` | `[2,2] val=2 → 0`
`[3,2,2,3] val=3 → 2` | `[0,1,2,2,3,0,4,2] val=2 → 5`

UWAGA — to NIE jest optymalizacja względem slow/fast. Obie wersje to
O(n) time, O(1) space — asymptotycznie identyczne. Różnica dotyczy tylko
LICZBY ZAPISÓW do tablicy (trade-off zależny od danych):

- collapse-from-ends pisze tylko przy trafieniu na `val` → mniej write'ów
  gdy `val` rzadki.
- slow/fast pisze przy każdym dobrym elemencie → mniej write'ów gdy `val`
  częsty.
  W praktyce ta różnica jest bez znaczenia dla wydajności (zapis do tablicy
  w cache to grosze). Pojawia się na rozmowie tylko gdy interviewer pyta wprost
  "da się z mniejszą liczbą modyfikacji tablicy?" — pytanie testuje, czy
  rozumiesz, co kod fizycznie robi z pamięcią.

Domyślny wybór na rozmowie: slow/fast — prostszy, oczywiście poprawny,
mniej miejsc na off-by-one. Collapse-from-ends pokaż dopiero gdy padnie
pytanie o write'y.

Alternatywa — slow/fast (prostsza, zawsze poprawna, domyślna na rozmowie):

```
k = 0
for (i = 0; i < nums.length; i++)
  if (nums[i] !== val) { nums[k] = nums[i]; k++ }
return k
```

Intuicja slow/fast (dlaczego kopia wystarcza, bez swapa):

- `k` to GŁOWA nowej, krótszej tablicy budowanej wewnątrz starej.
  `i` skanuje oryginał, dobre elementy "przelewane" na początek.
- `i` idzie tylko w przód i nigdy nie wraca → cokolwiek zostanie za `i`,
  nie będzie odczytane ponownie.
- Strefa `[0, k)` to potwierdzone dobre elementy; `i >= k` zawsze, więc
  nigdy nie czytasz wstecz do strefy dobrych.
- Zapis `nums[k] = nums[i]` nadpisuje komórkę `k`, w której leży ALBO
  `val` (śmieć), ALBO dobry element będący ZBĘDNĄ KOPIĄ — jego "prawdziwy"
  egzemplarz jest już w strefie `[0, k)`. W obu przypadkach nadpisanie
  niczego nie kosztuje. Swap byłby stratą ruchu — zachowuje element,
  którego nikt już nie odczyta.
- Gdy `k === i` (przed pierwszym `val`): zapis to no-op (element sam na siebie).
- Duplikacja JEST realna: kopia nie czyści źródła, więc dobra wartość
  potrafi istnieć w 2 miejscach. Duplikat ląduje w strefie `[k, len)` =
  legalny śmietnik (LeetCode liczy tylko pierwsze `k` pozycji).

Mini-input pokazujący nadpisanie dobrego-ale-zbędnego elementu:
`[2,3,4] val=2` → zapis1: 3 w idx0 `[3,3,4]` → zapis2: 4 w idx1 `[3,4,4]`,
gdzie nadpisana `3` w idx1 to kopia (oryginał już w idx0). return k=2.

Rodzina: LC 26 Remove Duplicates from Sorted Array, LC 283 Move Zeroes.

### 1.2 Fill-from-the-end (in-place merge) — LC 88 Merge Sorted Array

Idea: gdy trzeba scalić in-place do tablicy z zapasem miejsca na końcu, **pisz
od końca**. Pisanie od przodu nadpisuje dane, których jeszcze nie przeczytałeś,
i wymusza przesuwanie elementów. Pisanie od tyłu celuje w puste/zużyte komórki.

Szablon: trzy wskaźniki — `i` na koniec realnych danych pierwszej tablicy,
`j` na koniec drugiej, `k` na fizyczny koniec docelowej. W każdym kroku większy
z `nums1[i]` / `nums2[j]` ląduje na `nums1[k]`.

Kluczowa obserwacja: pętlę warunkuj **tylko** drugą tablicą (`while (j >= 0)`).
Gdy `nums2` się wyczerpie, reszta `nums1` jest już na miejscu. Resztę `nums2`
(gdy to `nums1` się wyczerpie) trzeba dopisać — robi to guard `i < 0`.

Complexity: O(m+n) czas, O(1) pamięć — optymalna.

Sygnał interviewera: "in-place", "tablica ma miejsce na końcu",
"bez dodatkowej pamięci" → fill-from-the-end.

Transfer: ten sam pomysł "pisz od końca, żeby nie nadpisać nieprzeczytanego"
wraca w Move Zeroes, przesuwaniu elementów w tablicy, String compression in-place.

## Rotate Array (LC 189)

Obrót tablicy o k miejsc w prawo, in-place.

### Podejście 1: Reverse trick ⭐ preferowane na rozmowie

reverse(nums, 0, n-1) → reverse(nums, 0, k-1) → reverse(nums, k, n-1)
Dlaczego: pełny reverse stawia oba bloki na miejscu, ale odwrócone wewnętrznie;
dwa kolejne reverse'y prostują każdy blok. Time O(n), space O(1).
3 wywołania jednej funkcji — mało miejsc na pomyłkę pod presją.

### Podejście 2: Cyclic replacement

Każdy element przenoszony bezpośrednio na (i+k)%n, "carry" niesie wypchniętą wartość.
Globalny licznik count < n jako warunek stopu (liczba cykli = gcd(n,k),
ale NIE liczymy gcd — licznik załatwia sprawę). Time O(n), space O(1).
Pytanie-pułapka: zagnieżdżone pętle to NIE O(n²) — count globalny, ciało
wewnętrzne odpala się łącznie n razy.

### Sygnały od interviewera

- "bez dodatkowej tablicy / O(1) space" → oczekuje jednego z tych dwóch
- normalizacja k = k % n: w reverse OBOWIĄZKOWA (inaczej index poza zakresem),
  w cyclic kosmetyczna ale wypada pokazać — standardowy "czy myślisz o k>n"

### Clue

Reverse trick: "odwróć całość, potem każdą połówkę z osobna".

## Best Time to Buy and Sell Stock (LC 121)

Jeden przebieg. Trzymaj min cenę "do tej pory", licz zysk = cena_dzis - min.
best = max(best, zysk) PRZED aktualizacja min — gwarantuje sprzedaz po kupnie.
Inicjalizuj best = 0 (brak transakcji = legalna opcja) → zero edge-case'ow.
Time O(n), space O(1).

### Sygnal

"a gdyby ceny tylko spadaly?" → odpowiedz: best=0 to obsluguje, return 0.

---

## 2. Linked lists

### 2.1 Reverse linked list — LC 206

Prototyp dla WSZYSTKICH problemów z odwracaniem/przepinaniem linked list
(Reverse Nodes in k-Group, Reverse Linked List II, Swap Nodes in Pairs).

Trzy zmienne `prev`, `curr`, `next` i kolejność:

> save next → flip pointer → advance prev → advance curr

```
let prev = null;
let curr = head;
while (curr !== null) {
  const next = curr.next;  // 1. zapamiętaj następnego ZANIM zerwiesz link
  curr.next = prev;        // 2. odwróć wskaźnik
  prev = curr;             // 3. przesuń prev
  curr = next;             // 4. przesuń curr
}
return prev;               // gdy curr === null, prev to nowa głowa
```

Wersja rekurencyjna:

```
if (head === null || head.next === null) return head;
const newHead = reverseList(head.next);
head.next.next = head;   // niech następny wskazuje na ciebie
head.next = null;        // zerwij stary link
return newHead;
```

Complexity: O(n) time. O(1) space iteracyjnie, O(n) rekurencyjnie (call stack).

Pułapki:

- Zapomnienie `const next = curr.next` → tracisz resztę listy.
- Zwrócenie `head` zamiast `prev` → zwracasz stary ogon (teraz wskazuje null).
- W rekursji: brak `head.next = null` → tworzysz cykl → stack overflow.

### 2.2 Odd Even Linked List — LC 328

Pattern: dwa wskaźniki + zapamiętana głowa drugiego łańcucha do sklejenia.

Klucz: 4 zmienne — `odd`, `even` (poruszające się ogony), `evenHead`
(zapamiętany start parzystych do finalnego sklejenia), `head` (zwracany).

Warunek pętli: `while (even && even.next)` — wystarczy sprawdzać dalszy wskaźnik
(`even` zawsze jest dalej niż `odd`, więc jeśli `even` żyje, `odd` też).

Kolejność w pętli ma znaczenie:
`odd.next` → odd advance → `even.next` → even advance.
Zmiana kolejności → gubisz referencje.

In-place, O(1) space, O(n) time. Bez tworzenia nowych nodów — tylko przepinanie.

Mylące: "odd/even" odnosi się do **pozycji** (1-indexed), nie wartości.

### 2.3 Half-and-reverse — LC 2130 Maximum Twin Sum

Kiedy używać: problem porównuje element z "przodu" z elementem z "tyłu" linked
list (twin sum, palindrome, reorder list).

Trzy klocki (każdy to osobny LC, każdy bywa pytany solo):

1. Find middle: `slow=head, fast=head; while (fast && fast.next) { slow=slow.next; fast=fast.next.next }`
   - Parzyste n: `slow` ląduje na pierwszym węźle drugiej połowy.
   - Nieparzyste n: `slow` ląduje na środkowym węźle.
   - Jeśli chcesz `slow` na OSTATNIM węźle pierwszej połowy → start `fast = head.next`.
2. Reverse od `slow` do końca (klasyczny prev/curr/next, patrz 2.1).
3. Walk: `first` od `head`, `second` od reversed-head, do `second === null`.

Complexity: O(n) time, O(1) space.

Pułapki:

- Warunek pętli walk to `while (second !== null)`, nie `first` — to `second`
  kontroluje odwrócony segment.
- `maxSum = 0` działa tylko gdy wartości gwarantowane >= 1; inaczej `-Infinity`.

Powiązane: LC 876 (find middle), LC 206 (reverse), LC 234 (palindrome ll),
LC 143 (reorder list).

Trick na rozmowie: jeśli interviewer pyta "czy możesz bez tablicy pomocniczej"
→ to sygnał, że oczekuje tego patternu.

### 2.4 Dummy / sentinel node

Wzorzec dla KAŻDEGO problemu z modyfikacją linked list, gdzie może zniknąć
głowa (delete head, merge from head, remove duplicates from head).

```
const dummy = { next: head };
// ... operuj na dummy zamiast head ...
return dummy.next;
```

Dummy node redukuje liczbę edge case'ów "co jeśli usuwam head" do zera —
nie potrzebujesz `if (!head || !head.next)`.

Dla "find/delete middle": połącz dummy ze slow/fast, gdzie `slow` startuje od
`dummy` — zatrzyma się wtedy na **poprzedniku** środka, gotowy do przepięcia.

Uwaga: dla pustej listy `slow.next.next` może rzucić NPE — sprawdź, czy problem
gwarantuje niepustą listę.

---

## 3. Drzewa

### 3.1 Bottom-up search z propagacją rezultatu — LC 236 LCA

Sygnatura: rekurencja zwraca **węzeł lub null**, gdzie zwrot ma podwójne
znaczenie ("znalazłem target" vs "to jest odpowiedź").

- Base case: `null` lub trafienie w jeden z szukanych węzłów.
- Krok rekurencyjny: rekurencja w lewo i prawo, decyzja na podstawie obu wyników.
- Kluczowy insight: jeśli oba poddrzewa zwracają non-null → bieżący węzeł jest
  punktem zbiegu. Jeśli tylko jedno → propaguj dalej.

Rdzeń do wbicia w pamięć mięśniową:

```
if (left && right) return root;
return left || right;
```

(`a && b` zwraca `b` gdy `a` truthy; `a || b` zwraca pierwszy truthy — operatory
zwracają operand, nie boolean.)

Complexity: O(n) time, O(h) space (call stack).

Powiązane: LC 235 (LCA in BST — wariant z porządkiem),
LC 1644 (LCA gdy węzły mogą nie istnieć — wymaga zliczania),
LC 124 (Max Path Sum — ta sama struktura).

Sygnał interviewera: "find a node satisfying X in a tree" + brak ograniczeń
na strukturę = bottom-up rekurencja jest pierwszym strzałem.

### 3.2 DFS — node zwraca multi-value info dla rodzica — LC 543/124/1372/687

Kiedy:

- "Najdłuższa / max coś" na ścieżce w drzewie.
- Ścieżka może zaczynać i kończyć się gdziekolwiek (nie tylko od roota).
- Decyzja w node zależy od kontekstu, z której strony przyszedł rodzic.

Klocki:

- DFS post-order.
- Helper zwraca tuple/object z info potrzebnym dla rodzica.
- Globalny `longest` / `maxSum` updatowany w każdym node.
- Sentinel dla null (zwykle -1 lub 0; przemyśl off-by-one za KAŻDYM razem).

Wzorzec myślowy:

1. "Co rodzic chce ode mnie wiedzieć?" → to jest return value.
2. "Co mogę policzyć tylko tu, mając info z obu dzieci?" → to updatuje global.
3. Return ≠ global update — to są zwykle różne rzeczy.

Problemy z rodziny (kolejność = progresja trudności):

- LC 543 Diameter — return depth, global trackuje `leftDepth + rightDepth`.
- LC 1372 Longest ZigZag — return `[L, R]`, global `max(L, R)`.
  `L(node) = 1 + R(node.left)`, `R(node) = 1 + L(node.right)`, sentinel `[-1,-1]`.
- LC 687 Longest Univalue Path — dodaje warunek `val == parent.val`.
- LC 124 Binary Tree Max Path Sum — final boss; dodaje `max(0, gain)` clipping.

Pułapki:

- Sentinel dla null — `[0,0]` zamiast `[-1,-1]` przy ZigZag → wynik za duży o 1.
- Return value (jedna strona) vs global (dwie strony przez node) — w 543/124
  to RÓŻNE rzeczy, w 1372 akurat te same.
- Multi-value return: zdefiniuj precyzyjnie, co oznacza każda składowa.

### 3.3 Leniwy DFS przez generator — LC 872/173/230

Kiedy musisz porównać dwie sekwencje wyprodukowane przez przechodzenie
struktury — _nie zbieraj do tablic_. Daj `function*` z `yield`/`yield*`
i porównuj iteratory parami przez `.next()`.

`yield* leaves(node.left)` = delegowanie do podgeneratora, równoważnik
`for (v of subGen) yield v` jednoliniowo.

Sygnał problemu: "porównaj coś, co produkowane jest przez traversal"
(liście drzew, ścieżki, sekwencje wartości).

Korzyść: O(h) zamiast O(n) extra space (bez pełnej tablicy), automatyczny
early exit — przerywasz w momencie pierwszej różnicy.

Klasyczne zadania: LC 872 (Leaf-Similar), LC 173 (BST Iterator),
LC 230 (Kth Smallest in BST — generator + `for (i=0; i<k; i++) it.next()`),
porównywanie dwóch BST in-order.

Uwaga: generatory to nie codzienny frontend — najbardziej przydatne przy
streaming traversal i early-exit search.

---

## 4. Prefix sum

### 4.1 Prefix sum + hashmap — LC 560/437/525/974

Klocki:

- Running sum od początku struktury.
- `HashMap<sum, count>` z `map.set(0, 1)` na start.
- Dla każdego punktu: `count += map.get(currentSum - K) ?? 0` PRZED dodaniem
  do mapy.
- Na drzewie: backtracking — dekrementuj wpis przy powrocie z rekurencji.

Kiedy:

- "Ile podtablic / ścieżek o sumie K".
- Sygnał interviewera: "can you do better than O(n²)?" po naive.
- Działa też dla liczb ujemnych (sliding window NIE działa).

Problemy:

- LC 560 Subarray Sum Equals K — wersja 1D, baseline.
- LC 437 Path Sum III — na drzewie, dodaje backtracking.
- LC 525 Contiguous Array — count 0/1, traktuj 0 jako -1, prefix sum.
- LC 974 Subarray Sums Divisible by K — mod K w mapie.

Pułapki:

- `map.set(0, 1)` ZANIM zaczniesz iterować — pokrywa ścieżkę od początku.
- Kolejność: sprawdź count → dodaj current → recurse → cleanup.
- Na drzewie: cleanup po recursion jest niezbędny, inaczej prefixy wyciekają
  między rodzeństwami.

Complexity: O(n) time, O(n) space.

## Slow/fast pointer — in-place dedup (posortowana tablica)

- Problemy: LC 26 (Remove Duplicates), LC 80 (wariant: maks 2 kopie),
  LC 27 (Remove Element), LC 283 (Move Zeroes)
- Idea: slow = ostatnia zapisana poprawna pozycja, fast = skan.
  Zapisuj nums[slow] tylko gdy element "kwalifikuje się".
- Złożoność: O(n) / O(1)
- Kluczowy wybór: porównuj z nums[slow] (co zachowałem), NIE z nums[fast-1].
  Wersja ze slow generalizuje się: LC 80 → porównanie z nums[slow-2].
- Edge case: pusta tablica — return slow+1 da błędne 1. Dodaj guard
  albo świadomie pomiń przy gwarantowanym constraint.
- Sygnał interviewera: pytanie "a maks 2 kopie?" → ten sam pattern,
  zmienia się tylko offset w porównaniu.

## Remove Duplicates from Sorted Array II (LeetCode 80)

- Pattern: slow/fast write pointer, in-place, "keep at most K"
- Klucz: `slow` = następne wolne miejsce do zapisu (konwencja B).
  Zapisz `nums[slow] = nums[fast]`, potem `slow++`. Krok zawsze o 1.
  Start: `slow = 2`, `fast = 2` (pierwsze 2 elementy z definicji OK).
  Return: `slow`.
- Warunek: zapisz `nums[fast]`, jeśli różni się od wartości K pozycji
  wstecz W WYNIKU → `nums[slow - K]`. Tu K=2.
- Intuicja warunku (własnymi słowami): testujemy hipotetyczny zapis —
  "gdybym wpisał nums[fast] do nums[slow], czy nums[slow-2..slow]
  byłyby trzema kopiami tej samej wartości pod rząd?". Jeśli
  nums[fast] === nums[slow-2] → tak → pomijamy. Sprawdzamy tylko
  slow-2 (nie slow-1), bo sortowanie wymusza, że element pomiędzy
  jest równy obu.
- Pułapka: NIE `nums[fast - K]`. Tablica jest nadpisywana in-place,
  więc `fast - K` może wskazywać zamazany element. Porównuj względem
  `slow` (region wyniku), nie `fast` (region wejścia).
- Reguła ogólna (slow/fast in-place): każdy odczyt świadomie
  zaszufladkuj — dotyczy wejścia (jeszcze nieczytane) → indeksuj `fast`;
  dotyczy wyniku (już zapisane) → indeksuj `slow`.
- Sorted matters: dzięki sortowaniu wystarczy 1 porównanie zamiast K
  — jeśli element = K-ty wstecz, wszystkie pomiędzy też są równe.
- Counterexample na ten bug: [1,1,1,2,2,2] → 4. Ciasne bloki
  powtórzeń ujawniają rozjazd slow vs fast.
- Złożoność: O(n) czas, O(1) pamięć.
- Sygnał interviewera: "bez dodatkowej tablicy" / "in-place".
- Generalizacja: dowolne K — zamień `slow - 2` na `slow - K`,
  start `slow = fast = K`. Reszta kodu bez zmian.
  K=1 → LeetCode 26 (Remove Duplicates I), `slow - 1`.
- Rozwiązanie:
  \```javascript
  var removeDuplicates = function (nums) {
  if (nums.length <= 2) return nums.length;
  let slow = 2;
  for (let fast = 2; fast < nums.length; fast++) {
  if (nums[fast] !== nums[slow - 2]) {
  nums[slow] = nums[fast];
  slow++;
  }
  }
  return slow;
  };
  \```

## Majority Element — Boyer-Moore Voting + dowód sortowania

**Problem:** znajdź element występujący > ⌊n/2⌋ razy — LC 169
**Gwarancja zadania:** taki element zawsze istnieje, n ≥ 1.

### Rozwiązanie optymalne: Boyer-Moore Voting

O(n) czas, O(1) pamięć — optymalne, nie da się pobić.

```js
var majorityElement = function (nums) {
  let candidate,
    count = 0;
  for (const num of nums) {
    if (count === 0) candidate = num; // wybór kandydata PRZED zliczeniem
    count += num === candidate ? 1 : -1;
  }
  return candidate;
};
```

**Idea:** `count` to bilans bieżącego segmentu „głosy za − głosy przeciw".
`count === 0` → segment zbalansowany, wyrzuć go i weź nowego kandydata.
Element większościowy przeżywa KAŻDE wyrzucenie, bo jest go ściśle
więcej niż reszty razem wziętej.

**Niuans formy:** wybór kandydata `if (count===0) candidate=num` PRZED
inkrementacją daje czystszy invariant („segment zbalansowany → odrzuć")
i łatwiej go obronić, gdy interviewer drąży „dlaczego to działa".
Wariant z wyborem kandydata PO zejściu do zera też przechodzi testy,
ale ma mniej wygodny argument poprawności.

### Alternatywy (interviewer pyta „a inaczej?")

| Podejście           | Czas       | Pamięć | Komentarz                 |
| ------------------- | ---------- | ------ | ------------------------- |
| HashMap (zliczanie) | O(n)       | O(n)   | najbardziej oczywiste     |
| Sort + nums[⌊n/2⌋]  | O(n log n) | O(1)   | elegancki, ale wolniejszy |
| Boyer-Moore         | O(n)       | O(1)   | optymalne — to wybrać     |

### Dlaczego sort + nums[⌊n/2⌋] działa (dowód)

Po posortowaniu wszystkie kopie tej samej wartości tworzą zwarty blok.
Blok elementu większościowego ma > n/2 elementów → jest dłuższy niż
połowa tablicy → MUSI przykryć indeks środkowy ⌊n/2⌋.

Dowód przez sprzeczność: gdyby blok NIE przykrywał środka, leżałby
w całości po jednej stronie. Każda strona ma ≤ ⌊n/2⌋ pozycji →
pomieściłaby ≤ n/2 elementów → sprzeczność z „> n/2".

Przykład — [1,1,2,3,4,5,5,5,5,5,5,5,5,6,7], n=15, ⌊15/2⌋=7:
idx: 0 1 2 3 4 5 6 [7] 8 9 10 11 12 13 14
val: 1 1 2 3 4 5 5 [5] 5 5 5 5 5 6 7
Blok ośmiu piątek (idx 5–12) zawsze nakrywa indeks 7.

Dowód NIE zależy od liczby różnych wartości — liczy tylko miejsca,
nie wartości. Świat jest dwuwartościowy: „element" vs „nie-element".

**Kluczowe założenie — OSTRA nierówność:** działa tylko dla > n/2,
nie ≥ n/2. Przy ≥ n/2 blok mógłby mieć dokładnie n/2 i zmieścić się
w całości po jednej stronie. Boyer-Moore opiera się na tej samej
ostrej nierówności (większość „przeżywa" zerowania tylko dlatego,
że jest jej ŚCIŚLE więcej niż reszty).

### Sygnał interviewera

„Da się bez dodatkowej pamięci?" → oczekiwany jest Boyer-Moore.

### Follow-up

LC 229 Majority Element II — elementy > ⌊n/3⌋ razy. Boyer-Moore
generalizuje się do 2 kandydatów (bo max 2 elementy mogą spełniać > n/3).

## Boyer-Moore Voting (Majority Element)

**Istota:** Znajdź element(y) występujące > n/k razy w O(n) czasie i O(1)
pamięci, bez hashmapy. Pętla "głosowania" wyłania kandydatów; osobny
przebiegiem weryfikujesz.

**Kiedy sięgać:**

- "element występujący > n/2 (lub > n/3, > n/k) razy"
- interviewer pyta "without extra space?" / "without a hashmap?"
  → to jest sygnał, że oczekiwany jest dokładnie ten wzorzec

**Liczba slotów kandydatów = k - 1:**

- n/2 → 1 slot (LC 169)
- n/3 → 2 sloty (LC 229)
- n/k → k-1 slotów
  Dowód: gdyby k elementów przekraczało n/k, ich suma wystąpień > n. Sprzeczność.

**Niezmiennik (działa TYLKO w jedną stronę):**
Jeśli element występuje > n/k razy → na pewno będzie wśród finalnych
kandydatów. Odwrotnie NIE: kandydat może nie przekraczać progu.
→ dlatego drugi przebieg (zliczenie faktycznych wystąpień) jest OBOWIĄZKOWY.

**Struktura pętli głosowania — kolejność gałęzi jest krytyczna:**

1. `num === istniejący kandydat` → inkrementuj jego licznik
2. (else) wolny slot (count === 0) → przypisz num, licznik = 1
3. (else) brak wolnych slotów → dekrementuj WSZYSTKIE liczniki
   Testy "czy num to istniejący kandydat" MUSZĄ iść przed testami na wolny slot.

**Pułapki:**

- Rozłączne gałęzie, nie łatki. Jeśli dodajesz warunek `num !== candidateX`,
  żeby dwa niezależne bloki `if` się "nie pobiły" — to objaw. Powinny być
  jednym `if / else if / else`. `else if` daje rozłączność za darmo;
  ręczne łatanie jest kruche i nie skaluje się przy 3+ przypadkach.
- Liczniki głosowania ≠ liczba wystąpień. To saldo, część głosów się
  skasowała. Po pętli liczniki są bezużyteczne — przelicz od zera.
- `c1 === c2`: kolejność gałęzi (krok 1 przed krokiem 2) gwarantuje, że
  num równy c1 nigdy nie dojdzie do przypisania c2 → kandydaci zawsze różni.
- Próg: `> n/k`, nie `>=`. Użyj `count > Math.floor(n/k)` — chroni też
  edge case `nums = []` (0 > 0 → false).

**Złożoność:**

- n/3: time O(n) (dwa liniowe przebiegi), space O(1) (6 skalarów,
  result ograniczony stałą 2 — output space, nie auxiliary)
- n/k: time O(n·k) — każdy element porównywany z k-1 slotami;
  space O(k). Dla małego stałego k → praktycznie O(n) / O(1).
- Kontrast: naiwne zliczanie w Map = O(n) auxiliary space. To jest
  upgrade, którego szuka interviewer.

**Powiązane LC:** 169 Majority Element (n/2), 229 Majority Element II (n/3)

## Best Time to Buy and Sell Stock II (122)

Pattern: Greedy — suma dodatnich różnic kolejnych elementów (delt)
Complexity: O(n) time, O(1) space

Kod (wersja na rozmowę):
let profit = 0;
for (let i = 1; i < prices.length; i++)
if (prices[i] > prices[i-1]) profit += prices[i] - prices[i-1];
return profit;

Dlaczego greedy jest poprawne (uzasadnienie dla interviewera):

1. Każdy hold [b,s] = suma WSZYSTKICH delt w oknie (suma teleskopowa:
   prices[s]-prices[b], bo każda wartość pośrednia wchodzi raz +, raz − i się kasuje).
2. Zadanie = "wybierz podzbiór sąsiednich delt o max sumie", decyzje NIEZALEŻNE
   (sprzedaż+natychmiastowy odkup po tej samej cenie = darmowe, zero tarcia).
3. Niezależność → bierz każdą deltę dodatnią, pomijaj ujemną. Koniec.

Pułapka mentalna (rozpracowana):
"wziąć zysk teraz" NIE konkuruje z "większą sprzedażą później" — można wziąć OBA.
Duży skok (np. 9-1) to NIE osobny ruch, to suma delt po drodze (+4 -2 +6).
Greedy bierze te same dodatnie delty co hold, odmawia tylko ujemnych → nigdy nie gorszy.
Dowód: hold[b,s] = Σ delt w oknie ≤ Σ dodatnich delt w oknie ≤ Σ wszystkich dodatnich delt = greedy.

Przykład: [1, 5, 3, 9] delty: [+4 (1→5)] [−2 (5→3)] [+6 (3→9)]
hold 1→9 = +4 −2 +6 = 8 (zjada dołek −2)
greedy 1→5,3→9 = +4 +6 = 10 (wycina dołek)

Sygnał: nielimitowane transakcje + "max profit" → greedy delty
Pułapka nazewnicza: zmienna = prev (NIE lowest); to NIE jest minimum
Related: 121 (jedna transakcja → śledź min), 309 (cooldown → DP), 714 (z fee → DP)

## Jump Game (55)

Pattern: Greedy — forward "maxReach" (najdalszy osiągalny indeks)
Complexity: O(n) time, O(1) space

Kod (wersja na rozmowę):
let maxReach = 0;
for (let i = 0; i < nums.length; i++) {
if (i > maxReach) return false;
maxReach = Math.max(maxReach, i + nums[i]);
}
return true;

Dowód (jedno zdanie): maxReach = najdalszy osiągalny indeks, niemalejący;
porażka tylko gdy i > maxReach (do i nie da się dojść) → nikt wcześniejszy też nie pokryje.

Kryterium równoważne: dotrzesz do końca ⟺ każde zero (poza ostatnim idx)
da się przeskoczyć: ∃ i<j: i + nums[i] > j. (Zacięcie greedy zawsze na zerze.)

Alt (backward, sprytne ale trudniejsze do dowodu): śledź ostatnie
nieprzeskoczone zero, kasuj gdy i+nums[i] > zeroIdx. Działa, bo indeks
kasujący przeskakuje też wszystkie zera po drodze; twardy bloker nigdy
nie skasowany. UWAGA: porównuj zeroIdx === null, NIE !zeroIdx (indeks 0 jest falsy!).

Pułapka kodowa: zmienne trzymające INDEKS testuj `=== null` / `=== -1`,
nigdy truthiness — bo indeks 0 jest falsy.
Sygnał: "czy da się dojść" + skoki o zmiennej długości → greedy maxReach
Related: 45 (Jump Game II — min skoków, to samo maxReach + licznik warstw)

## Greedy: BFS-layers reach tracking (Jump Game family)

**Kiedy:** minimalna liczba skoków / kroków po tablicy zasięgów, gdzie z indeksu `i`
możesz przejść do dowolnego `[i+1 ... i+nums[i]]`. Pytasz o MIN liczbę ruchów.

**Pattern (O(n) greedy = BFS po warstwach):**

1. Trzymaj DWIE osobne wielkości:
   - `maxReach` — najdalszy osiągalny indeks w ogóle (zbierany dla KAŻDEGO i).
   - `range` (currentEnd) — prawy brzeg bieżącej warstwy / zasięg bieżącego skoku.
2. Pętla `i` od 0 do `n-2` (nigdy nie skaczesz Z ostatniego indeksu):
   - `maxReach = max(maxReach, i + nums[i])` // bezwarunkowo, co iterację
   - gdy `i === range` → wyczerpałeś warstwę: `jumps++`, `range = maxReach`.
3. Early exit: gdy `range >= n-1` → return jumps.

**Klucz (to, co łatwo zepsuć):**

- `jumps++` pada gdy DOBIJASZ do brzegu warstwy (`i === range`), NIE gdy `maxReach` rośnie.
- W obrębie jednego okna skanujesz WSZYSTKIE indeksy — naiwne "skacz najdalej z bieżącego
  pola" jest błędne (kontrprzykład: [2,2,0,1,1] → skok na idx 2 = pułapka 0).

**Wizualizacja warstw:**
[2, 3, 1, 1, 4]
idx:[0] 1 2 3 4
warstwa 0 = {0}, range=0
warstwa 1 = {1,2}, range=2 (jumps=1)
warstwa 2 = {..4}, range=4 (jumps=2) → koniec

**Complexity:** O(n) time, O(1) space. Optymalne — każdy indeks oglądany ≥1 raz.

**LC problems:**

- 45 Jump Game II (min skoków — TEN pattern)
- 55 Jump Game (czy w ogóle dosięgniesz końca — tylko maxReach, bez warstw)
- 1326 Min Taps to Water Garden (ten sam greedy, mapowany na interwały)

**Interviewer signals:**

- "minimum number of jumps/steps" + tablica zasięgów → greedy layers, nie DP.
- Jak zaczniesz od DP O(n²) — powiedz że istnieje, ale greedy zbija do O(n); to oczekiwana
  ścieżka na seniorze/midzie.
- Umiej nazwać że trailing return to unreachable code (problem gwarantuje osiągalność).
- Rozróżnienie maxReach vs currentEnd to dokładnie to, czego szukają — wypowiedz to głośno.

## Array + HashMap — Random Access with O(1) Insert/Delete

**Problem:** Insert Delete GetRandom O(1) (LC 380)
**Trigger:** need insert / delete / _uniform random pick_ all in O(1) avg.

**Core insight:** Set/Map daje O(1) membership ale BRAK random access po
indeksie -> getRandom byłby O(n) (iteracja do k-tego). Array daje random
access O(1) ale find+delete-from-middle to O(n). Połącz oba:

- array : trzyma wartości (random access dla getRandom)
- map : value -> index w array (O(1) find dla remove)

**Remove w O(1) — swap-with-last trick:** usuwanie ze środka tablicy = O(n)
(zasypywanie dziury). Skoro kolejność nieistotna (i tak losujemy), zamień
usuwany element z OSTATNIM, zaktualizuj indeks ostatniego w mapie, usuń
ostatni. Dziura zniknięta bez przesuwania.
index = map.get(val); last = arr[arr.length-1];
arr[index] = last; map.set(last, index);
arr.pop(); map.delete(val);

**Wariant bez pop() (logical size):** zamiast skracać tablicę, traktuj
arr[0..map.size-1] jako logiczne, resztę jako stale sloty; insert nadpisuje
stale sloty zanim push. Ta sama complexity, kosztem martwych referencji do
peak size. Niezmiennik: logiczne elementy zajmują ciągły zakres 0..size-1.

**Anti-pattern:** getRandom przez iterację po Set/Map do k-tego elementu = O(n).
**Anti-pattern:** delete-from-middle tablicy przez splice/filter = O(n).

**Edge:** remove ostatniego elementu -> swap-with-self musi być no-op-safe.
**Complexity:** insert/remove O(1) avg, getRandom O(1), space O(n).
**Related:** Two Sum (value->index map), wszystkie "O(1) lookup zamiast O(n) scan".

# Gas Station (LeetCode 134)

**Kategoria:** Greedy / one-pass running balance
**Trudność:** Medium
**Powiązane:** Jump Game II (two-variable greedy), Maximum Subarray (Kadane — running sum z resetem), Stock II (greedy decomposition na sumę `diff`)

---

## Problem w skrócie

Stacje ułożone w okrąg. `gas[i]` = ile zatankujesz na stacji `i`. `cost[i]` = koszt przejazdu z `i` do `i+1`. Znajdź indeks startowej stacji, z której da się objechać cały okrąg (wrócić na start), albo `-1`. **Jeśli rozwiązanie istnieje, jest unikalne.**

Kluczowy przekształcenie: pracuj na `diff[i] = gas[i] - cost[i]`. Tank w trasie to bieżąca suma `diff`.

---

## Dwa filary (cały algorytm stoi na nich)

### Filar 1 — Existence check (warunek globalny)

- Koszt pełnego obrotu = `sum(cost)`, niezależnie od startu. Tak samo `sum(gas)`.
- **`sum(gas) >= sum(cost)` ⇔ rozwiązanie istnieje.**
  - Warunek jest **konieczny ORAZ wystarczający** (nie tylko konieczny).
  - Konieczny: bez nadwyżki paliwa na cały okrąg fizycznie nie zamkniesz pętli.
  - Wystarczający: jeśli `sum(diff) >= 0`, to _istnieje_ punkt, od którego prefiks nigdy nie spada poniżej zera (dowód: weź punkt minimum skumulowanej sumy `diff` — start tuż za nim). Plus gwarancja unikalności domyka, że ten punkt jest jeden.
- **Granica to `>=`, nie `>`.** Przy `sum(gas) === sum(cost)` nadwyżka = 0, ale rozwiązanie nadal istnieje (objeżdżasz okrąg, kończąc z tankiem dokładnie 0).

### Filar 2 — Restart na `j+1` (warunek lokalny, greedy)

Startując od `start`, tank **pierwszy raz** spada `< 0` na stacji `j`. Wtedy:

- **Cały blok `start..j` jest martwy** — żadna z tych stacji nie jest poprawnym startem.
- Dowód (przez kandydata pośredniego `k`, gdzie `start < k <= j`): start od `k` wyrzuca dodatni prefiks `diff[start..k-1]` (był dodatni, bo do `k` dojechałeś z tankiem `>= 0`). Więc do `j` dotrzesz z tankiem **mniejszym lub równym** niż startując od `start`. Skoro `start` nie dał rady — `k` tym bardziej nie da. ∎
- Wniosek: **przeskocz cały blok**, ustaw `start = j+1`, wyzeruj tank. **Nigdy nie wracaj** do stacji przed nowym `start`.

### Dlaczego razem dają O(n) bez weryfikacji pełnego obrotu

Po jednym przejściu `0 → n-1` `start` wyląduje na stacji, od której do `n-1` tank nie spadł ani razu. Filar 2 dowodnie odrzucił wszystkie stacje przed nim. Jeśli Filar 1 mówi „rozwiązanie istnieje" i jest **dokładnie jedno**, a wszyscy inni kandydaci odpadli — zostaje ten jeden `start`. **Nie trzeba ręcznie sprawdzać, czy domyka kółko** — existence check to gwarantuje.

---

## Rozwiązanie (canonical, single-pass)

```javascript
var canCompleteCircuit = function (gas, cost) {
  let total = 0; // existence check (sum of all diff)
  let currentTank = 0; // running balance od bieżącego startu
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    currentTank += diff;

    if (currentTank < 0) {
      start = i + 1; // przeskocz martwy blok start..i
      currentTank = 0; // reset
    }
  }

  return total >= 0 ? start : -1;
};
```

- `total` i `currentTank` akumulują to samo `diff[i]` — dlatego oba liczniki da się policzyć w **jednym** przejściu (zamiast dwóch osobnych `reduce` + pętla).
- Brak `% gas.length` — szukając startu nigdy nie zawijamy.

---

## Złożoność

| Wersja                                         | Czas               | Pamięć |
| ---------------------------------------------- | ------------------ | ------ |
| Brute force (każdy start osobno, z zawijaniem) | O(n²)              | O(1)   |
| Two `reduce` + pętla                           | O(n) (3 przejścia) | O(1)   |
| Single-pass (`total` wtopiony w pętlę)         | O(n) (1 przejście) | O(1)   |

Wszystkie O(n) asymptotycznie równoważne; single-pass to wersja „pokazuję, że widzę redundancję".

---

## Edge cases

- `n === 1`: jedna stacja. Zwraca `0`, jeśli `gas[0] >= cost[0]`, inaczej `-1` (dzięki `total >= 0`). OK.
- Puste tablice `[]`: pętla się nie wykonuje, `total = 0`, zwraca `start = 0`. Formalnie wątpliwe (brak stacji = brak startu), ale **constraints LeetCode gwarantują `n >= 1`**, więc nie wybucha. Na rozmowie warto powiedzieć: „dla `n=0` dodałbym guard, ale constraint to wyklucza".
- `sum(gas) === sum(cost)`: rozwiązanie istnieje, `>=` je łapie.

---

## Pitfalls

1. **`% gas.length` podczas szukania startu = ukryty „powrót wstecz".** To był główny bug w pierwszym podejściu. Zawijanie pozwala wewnętrznej pętli odwiedzić stację _przed_ aktualnym startem, a potem `start = currentStation + 1` ustawia start z powrotem na tę samą stację → **pętla nieskończona**. Sprzeczność z własnym insightem („start idzie tylko do przodu"). Reguła: jeśli algorytm mówi „nigdy nie wracaj", to `%` nie ma prawa pojawić się w fazie szukania startu.

   ```
   diff = [-10, 0, +9],  i=1 (start)
   currentStation: 2 → (2+1)%3 = 0   ← zawinięcie ZA start
   tank += diff[0] = -10  →  < 0
   start = 0 + 1 = 1                  ← z powrotem na to samo i  →  ∞
   ```

2. **Zagnieżdżona pętla zamiast jednej.** Przy braku zawijania `currentStation` zawsze równa się `i` — wewnętrzna pętla nie robi nic, czego nie robi pojedyncza pętla po `i`. Dwie pętle to relikt myślenia „sprawdź każdy start osobno" (źródło O(n²)). Greedy potrzebuje **jednej** pętli i przesuwania `start`.

3. **Mylenie warunku istnienia z weryfikacją trasy.** Pokusa, by po znalezieniu `start` jeszcze raz objechać okrąg i sprawdzić, czy się domyka. Niepotrzebne: existence check (`sum >= 0`) + unikalność to gwarantują. Dodatkowa weryfikacja = zbędne O(n) i sygnał, że nie ufa się własnemu dowodowi.

4. **`>` zamiast `>=` w existence check.** Ostre `>` gubi przypadek `sum(gas) === sum(cost)`, w którym rozwiązanie istnieje. Granica jest `>=`.

5. **Reset tylko `start` bez `currentTank = 0`** (lub odwrotnie). Po przeskoku trzeba wyzerować _obie_ rzeczy związane z bieżącym startem — `start` na `i+1` i `currentTank` na `0`. `total` zostaje nietknięty (to akumulator globalny).

---

## Clue do flashcardu (Quizlet)

> Gas Station — `sum(gas) >= sum(cost)` ⇔ rozwiązanie istnieje (unikalne). Tank `<0` na `j` → blok `start..j` martwy → `start = j+1`, nie wracaj. Existence check zastępuje weryfikację obrotu. Jeden pass, zero `%`.

## LC 135 — Candy (Hard)

**Pattern:** Two-pass independent constraints + Math.max merge

**Klucz:** Każdy element ma DWA niezależne dolne ograniczenia (z lewej i z prawej).
Policz każde osobno w oddzielnym przejściu, połącz przez max — bo element musi
spełnić oba naraz, więc rządzi mocniejsze.

**Rozwiązanie:**

```javascript
function candy(ratings) {
  const candy = new Array(ratings.length).fill(1);

  // Pass 1 (L→R): pilnuje TYLKO lewego sąsiada
  for (let i = 1; i < candy.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candy[i] = Math.max(candy[i], candy[i - 1] + 1);
    }
  }

  // Pass 2 (R→L): pilnuje prawego, bez kasowania dorobku Pass 1
  for (let i = candy.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candy[i] = Math.max(candy[i], candy[i + 1] + 1);
    }
  }

  return candy.reduce((acc, c) => acc + c, 0);
}
```

**Złożoność:** Time O(n) — dwie pętle SEKWENCYJNE, nie zagnieżdżone (2n → O(n)).
Space O(n) — tablica wyników do scalania.

**Pitfalls:**

1. `=` zamiast `Math.max` w Pass 2 → kasuje dorobek Pass 1. Przykład:
   [1,2,3,4,1] przy i=3, `=` daje candy[3]=2 i łamie podjazd z lewej. Max(4,2)=4 ratuje.
2. Każde przejście egzekwuje JEDNĄ regułę. Pokusa, żeby w jednym przejściu
   obsłużyć obu sąsiadów (if/else if dotykający i-1 oraz i+1) → bug, bo piszesz
   do sąsiada, który nie jest jeszcze finalny / już go minąłeś.
3. Dlaczego Math.max jest bezpieczny: fakty z Pass 1 mówią "bądź większy",
   a Math.max tylko rośnie/zostaje → nie potrafi złamać "musisz być większy".

**Greedy correctness:** odpowiedź per dziecko = max(constraint_lewy, constraint_prawy),
bo musi spełnić oba — to dolna granica, której nie da się obejść taniej.

**Related:** problemy "dwa niezależne ograniczenia, policz osobno, połącz na końcu".

## LC 42 — Trapping Rain Water

**Pattern:** Prefix max z dwóch kierunków (dwa kierunkowe przebiegi + scalanie przez `min`)

**Kluczowy insight:** Nie szukasz kontenerów. Pytasz KAŻDĄ komórkę z osobna:
"jaki najwyższy mur trzyma Cię z lewej, jaki z prawej". Niższy z nich = poziom wody.

    woda[i] = min(leftMax[i], rightMax[i]) - height[i]

- `leftMax[i]` = najwyższy słupek GDZIEKOLWIEK na lewo (z i włącznie), nie sąsiad `i-1`
- `rightMax[i]` = najwyższy słupek gdziekolwiek na prawo
- `min`, bo woda przelewa się nad niższą ścianą i ucieka

**Dlaczego DWA przebiegi:** idąc od lewej nie znasz przyszłości — `rightMax`
jeszcze nie istnieje. Więc: przebieg 1 zbiera wiedzę z lewej, przebieg 2 (od prawej)
z prawej, przebieg 3 scala. Brzegi załatwiają się same: na skraju własna wysokość
JEST maksimum z jednej strony → `min - height = 0`, bez specjalnego case'a.

**Złożoność:** O(n) czas, O(n) pamięć (dwie tablice prefiksowe).

**Pitfalls:**

- ⚠️ `rightMax.unshift(x)` w pętli = UKRYTE O(n²) — każdy unshift przesuwa całą
  tablicę. Zapisuj pod indeks: `rightMax[i] = currentMax`. (Ta sama pułapka co
  `array.shift()` w BFS — kojarz razem.)
- `leftMax` to max SKUMULOWANY (`Math.max(running, height[i])`), nie `height[i-1]`.
  Woda opiera się o najdalszy wystarczająco wysoki mur, nie o sąsiada.
- Pomylenie `min`/`max` przy scalaniu — to MIN dwóch murów (niższy limituje).

**Related:**

- LC 135 Candy — TA SAMA RODZINA: pojedynczy przebieg decyduje na podstawie
  nieaktualnych sąsiadów → dwa kierunkowe przebiegi, każdy egzekwuje jedno
  ograniczenie, `min`/`max` scala bez nadpisywania.
- Wariant O(1) pamięci: two-pointer (przesuwasz niższą stronę, bo to ona limituje).
- Alternatywa: monotonic stack (liczy wodę warstwami poziomo) — mniej czytelna.

**Trace (3,0,0,0,1 → 3):**

    idx:        0    1    2    3    4
    height:     3    0    0    0    1
    leftMax:    3    3    3    3    3
    rightMax:   3    1    1    1    1
    min(L,R):   3    1    1    1    1
    woda:       0    1    1    1    0

## LC 12 — Integer to Roman

**Pattern:** Greedy z rozszerzoną tabelą (subtractive forms jako zwykłe wpisy)

### Problem

Zamień liczbę (1–3999) na zapis rzymski. Trudność: formy subtraktywne (IV=4, IX=9, XL=40, XC=90, CD=400, CM=900) łamią naiwny greedy oparty tylko na symbolach bazowych.

### Key insight

**Nie traktuj 4 i 9 jako special-case.** Wrzuć formy subtraktywne do tej samej posortowanej (malejąco) tabeli co symbole bazowe. Wtedy jeden greedy obsługuje cały zakres — wyjątek znika, bo staje się zwykłym wpisem.

Meta-pattern: _rozszerz strukturę danych zamiast dodawać gałąź `if` na wyjątek._

### Approach

1. Tabela `[value, symbol]` posortowana malejąco, zawierająca bazowe ORAZ subtraktywne.
2. Dla każdego wpisu: dokładaj `symbol` do wyniku dopóki `num >= value`, odejmując `value`.
3. Przejdź do kolejnego (mniejszego) wpisu.

```javascript
const intToRoman = function (num) {
  const map = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, symbol] of map) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
};
```

### Complexity

- **Czas:** O(1) — liczba symboli w wyniku ograniczona (num ≤ 3999 → max ~15 znaków).
- **Pamięć:** O(1) plus string wynikowy.

### Pitfalls

- **Naiwny greedy bez subtractive forms** zawodzi dokładnie na cyfrach 4 i 9 (zwróci IIII zamiast IV). Łatwo to przeoczyć, jeśli testujesz tylko na "ładnych" liczbach.
- **Rozwiązanie przez parsowanie cyfr/stringów** (osobna gałąź dla pierwszej cyfry == "4"/"9", budowanie potęg dziesiątki przez `"0".repeat(...)`) jest poprawne, ale przekombinowane — dwa mechanizmy zamiast jednego. Czerwona flaga na interview.
- **Poleganie na `Object.keys(obj)` jako posortowanej liście** działa (JS enumeruje klucze integer-like rosnąco), ale opiera się na subtelności specyfikacji. Jawna tablica = zero pytań od recenzenta o porządek kluczy.

### Related

- **LC 13 — Roman to Integer** (kierunek odwrotny; subtractive wykrywane przez porównanie sąsiadów: jeśli bieżący symbol < następny → odejmij zamiast dodać).
- Coin change / greedy z nietypowymi nominałami — ten sam meta-pattern "zakoduj wyjątek jako wpis w tabeli".

# LC 151 — Reverse Words in a String (in-place, bez built-insów)

> **Wariant docelowy:** odwróć kolejność słów, zjedz nadmiarowe spacje
> (leading / trailing / multiple), bez `split(/\s+/)` po słowach i bez
> `Array.prototype.reverse()`. Operuj na mutowalnej tablicy znaków
> two-pointerami pisanymi ręcznie.

---

## Key insight

Zadanie rozpada się na **dwie ortogonalne fazy** — i to jest cały trik:

1. **Kompakcja spacji** (read/write two-pointer) → znormalizowana, _krótsza_ tablica.
2. **Double reverse** → reverse całości, potem reverse każdego słowa z osobna.

Sedno fazy 2: **reverse całości ustawia słowa w docelowej kolejności, ale psuje
litery wewnątrz słów. Reverse per-word cofa to lokalne odwrócenie.**

```
"the sky"  --reverse całości-->  "yks eht"   (kolejność słów OK, litery odwrócone)
"yks eht"  --reverse per-word--> "sky the"   (litery naprawione)
```

Faza 1 i faza 2 są niezależne — można je rozumieć i debugować osobno.

---

## Dwa różne two-pointery w jednym zadaniu

To zadanie używa **dwóch wzorców two-pointer**, które łatwo pomylić:

|                         | kierunek                                              | cel                           |
| ----------------------- | ----------------------------------------------------- | ----------------------------- |
| `reverseRange` (faza 2) | wskaźniki **ku sobie** z dwóch końców                 | odwrócenie zakresu            |
| kompakcja (faza 1)      | **oba w tę samą stronę**, różne prędkości (slow/fast) | usunięcie nadmiarowych spacji |

`read` czyta **każdy** znak; `write` wskazuje, gdzie wyląduje **następny zachowany**
znak i rośnie tylko wtedy, gdy coś zapisujemy.

---

## Reguła kompakcji

Znak **przeżywa**, gdy:

- jest **literą** (nie-spacją), **LUB**
- jest **spacją, a poprzedni _zapisany_ znak był literą** (pierwsza spacja separatora).

Konsekwencje, które "załatwiają się same", jeśli regułę postawisz dobrze:

- **Leading** znika sam: na starcie nic nie zapisano (`write === 0`), więc pierwsza
  spacja nie ma prawa przejść.
- **Multiple** kolapsują do jednej: druga+ spacja ciągu ma "poprzedni zapisany = spacja" → skip.
- **Trailing** wymaga **jednej linijki po pętli** (patrz niżej) — sama reguła go przepuszcza,
  bo ostatnia spacja po słowie ma literę przed sobą.

---

## Kanoniczna implementacja

```javascript
const reverseRange = (arr, left, right) => {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
};

const reverseWords = function (s) {
  const sArray = s.split(""); // marshalling wejścia (string → mutowalna tablica)

  // FAZA 1: kompakcja spacji (read/write, oba w tę samą stronę)
  let write = 0;
  for (let read = 0; read < sArray.length; read++) {
    const keep =
      sArray[read] !== " " || // litera zawsze przechodzi
      (write > 0 && sArray[write - 1] !== " "); // pierwsza spacja po literze
    if (keep) sArray[write++] = sArray[read];
  }
  if (write > 0 && sArray[write - 1] === " ") write--; // trailing
  sArray.length = write; // obcięcie ogona in-place (zamiast slice)

  // FAZA 2: double reverse
  reverseRange(sArray, 0, sArray.length - 1); // reverse całości
  let left = 0;
  for (let right = 0; right < sArray.length; right++) {
    if (sArray[right] === " ") {
      reverseRange(sArray, left, right - 1); // reverse słowa [left, right-1]
      left = right + 1; // start następnego słowa za spacją
    }
  }
  reverseRange(sArray, left, sArray.length - 1); // flush ostatniego słowa

  return sArray.join(""); // marshalling wyjścia (tablica → string)
};
```

> Po `sArray.length = write` tablica jest już znormalizowana (single spaces, bez brzegowych),
> więc faza 2 nie potrzebuje guardu `if (left !== right)` ani osobnego `lastValidCharIndex` —
> `sArray.length` jest jedyną prawdą o długości.

---

## Złożoność

- **Czas:** `O(n)` — kompakcja jednym przejściem; faza 2 to reverse całości (`O(n)`)
  - suma reverse słów (każdy znak ruszony raz, `O(n)`); `join` `O(n)`.
- **Pamięć:** `O(n)` — tablica znaków.
  **W JS prawdziwego `O(1)` extra space NIE ma**, bo string jest immutable —
  `split("")` na tablicę kosztuje `O(n)`. To świadoma granica języka, nie błąd.
  (W C++/Javie z mutowalnym `char[]` ta wersja byłaby `O(1)` extra space.)

---

## Pitfalls (nazwane anty-patterny)

1. **`read - 1` zamiast `write - 1` w regule kompakcji.**
   Patrzenie na _poprzedni przeczytany_ znak (`sArray[read - 1]`) zamiast na
   _poprzedni zapisany_ (`sArray[write - 1]`) **daje poprawny wynik**, ale tylko przez
   nieoczywisty dowód o równoważności pozycji (gdy `write` zostaje w tyle za `read`).
   → Używaj `write - 1`: to jest dosłownie "to, co opisuje semantyka", bez dowodu.

2. **Redundantne `length - 1` w warunku pętli per-word.**
   `right < sArray.length - 1` _działa_ na znormalizowanym wejściu, ale tylko dlatego,
   że ostatnie słowo i tak domyka flush po pętli. `- 1` **sygnalizuje logikę granicy,
   której tam nie ma** → mylące. Użyj pełnego `right < sArray.length`.

3. **Śmieci za `write`.** Po kompakcji `sArray` ma ogon starych znaków za pozycją `write`.
   Faza 2 i `join` MUSZĄ operować na `[0, write)`. Najczyściej: `sArray.length = write`
   (obcięcie in-place), wtedy reszta kodu używa po prostu `sArray.length`.

4. **Trailing przeżywa.** Reguła kompakcji wpuszcza spację po literze — a trailing spacja
   _też_ ma literę przed sobą. → jedna linijka po pętli: `if (write > 0 && sArray[write-1] === " ") write--`.
   Guard `write > 0` chroni przed zejściem na `-1` przy pustym wejściu.

5. **Reverse to permutacja, nie usuwanie.** Sam double reverse NIGDY nie usunie spacji —
   wchodzi i wychodzi ten sam multizbiór znaków. Normalizacja spacji to _osobna_ faza (kompakcja),
   nie efekt uboczny odwracania. Próba "naprawienia spacji w fazie reverse" = ślepa uliczka.

---

## Zasada built-insów (dla follow-upów "bez split/reverse")

Nie ma sztywnej listy "wolno / nie wolno". Pytanie brzmi:
**czy built-in robi za Ciebie _istotę zadania_, czy tylko _przekłada dane_?**

- **Zakazane** (istota): `split(/\s+/)` = tokenizacja; `Array.prototype.reverse()` = odwracanie.
- **Dozwolone** (marshalling I/O): `split("")`, `join("")`, indeksowanie `s[i]`, `arr.length = k`.
- **Redukowalne do zera built-insów**, jeśli interviewer naciska: wejście przez `s[i]`
  (string jest indeksowalny, tylko niemutowalny), wyjście przez ręczną pętlę
  `for (...) res += arr[i]`, obcięcie przez `arr.length = k` zamiast `slice`.

`slice(0, k)` jest technicznie po dozwolonej stronie (nie tokenizuje, nie odwraca),
ale **zbędny** — pojawia się tylko, gdy nie obetniesz tablicy. `arr.length = k` go eliminuje.

---

## Interview talking points

- "Trudność 151 to nie odwracanie — to **normalizacja whitespace**. Rozbijam na dwie fazy:
  kompakcja read/write, potem double reverse."
- "Reverse całości daje dobrą kolejność słów, ale odwraca litery — per-word reverse to cofa."
- "W JS nie ma `O(1)` space: string immutable, więc `split("")` to `O(n)`. W C++ z `char[]`
  byłoby `O(1)`."
- "Co do built-insów — granica jest taka: built-in nie może robić istoty zadania.
  `split("")`/`join` to marshalling, mogę je zejść do zera ręczną pętlą, jeśli trzeba."

---

## Related

- **LC 344** — Reverse String (sam `reverseRange`, baza)
- **LC 557** — Reverse Words III (reverse per-word _bez_ zmiany kolejności słów)
- **LC 27 / 26 / 283** — Remove Element / Remove Duplicates / Move Zeroes
  (ta sama kompakcja read/write — "co przeżywa?")
- **LC 186** — Reverse Words II (premium; ten sam in-place double reverse)

## LC 68 — Text Justification

**Kategoria:** greedy line-packing + per-line justification (string simulation)

### Key insight

Dwie fazy. (1) **Greedy packing** — dokładaj słowa do linii póki mieszczą się z minimum jedną spacją na gap. (2) **Justification per linia** — nadmiar spacji policz arytmetyką całkowitą, nie pętlą: `base = floor(total / gaps)` na każdy gap, `extra = total % gaps` rozłożone na **lewe** gapy. Dwa przypadki brzegowe (single-word line ORAZ last line) redukują się do tego samego left-justify: `join(" ").padEnd(maxWidth)`.

### Canonical implementation

```javascript
const fullJustify = function (words, maxWidth) {
  const res = [];
  let line = [];
  let len = 0; // suma znaków słów w linii (bez spacji)

  for (const word of words) {
    // fit-check: len słów + gapy (line.length) + nowe słowo
    if (len + line.length + word.length > maxWidth) {
      res.push(justify(line, len, maxWidth));
      line = [];
      len = 0;
    }
    line.push(word);
    len += word.length;
  }

  res.push(line.join(" ").padEnd(maxWidth)); // last line: zawsze left-justify
  return res;
};

function justify(line, len, maxWidth) {
  if (line.length === 1) return line[0].padEnd(maxWidth); // single word
  const gaps = line.length - 1;
  const total = maxWidth - len;
  const base = Math.floor(total / gaps);
  const extra = total % gaps;

  let out = "";
  for (let i = 0; i < line.length; i++) {
    out += line[i];
    if (i < gaps) out += " ".repeat(base + (i < extra ? 1 : 0));
  }
  return out;
}
```

### Named pitfalls + root causes

1. **Last-line trap** — root cause: ostatnia linia ma inne reguły (left-justify, nie distribute). Objaw: podwójne spacje w środku ostatniej linii. Fix: flush poza pętlą przez `padEnd`, nie przez `justify()`.
2. **Single-word → dzielenie przez zero** — root cause: przy jednym słowie `gaps = 0`, więc `total / gaps` = dzielenie przez zero. Fix: osobny early-return `padEnd`.
3. **Left-heavy remainder** — root cause: reszta `extra = total % gaps` MUSI iść na lewe gapy. `i < extra` celuje w prefiks; `i >= gaps - extra` dałoby prawidłową sumę, ale zły kształt (`Science is  what  we` zamiast `Science  is  what we`).
4. **Off-by-one w fit-check** — root cause: trzeba doliczyć minimalne pojedyncze spacje = liczba gapów = `line.length` (bieżąca, PRZED pushem nowego słowa).
5. **Zgubiona ostatnia linia** — root cause: in-loop flush wypycha tylko linie zamknięte przez niemieszczące się słowo; ostatnia grupa słów nigdy nie trafia do flusha w pętli. Post-loop push jest load-bearing. Guard `if (line.length)` — potrzebny TYLKO defensywnie przy `words = []`, poza constraintami LC.

### Complexity

- **Czas:** O(suma znaków outputu) = O(liczba słów · maxWidth) w najgorszym razie.
- **Pamięć:** O(output). Wariant arytmetyczny i „pętla po spacji" — identyczne complexity, różnica czysto czytelnościowa.

### Talking points (interview)

- „Greedy packing z fit-checkiem `len + gaps + nowe słowo`, gdzie gaps = liczba słów już w linii."
- „Distribution to arytmetyka, nie symulacja: `base = floor(total/gaps)`, reszta modulo na lewe gapy przez `i < extra`."
- „Dwa przypadki brzegowe — single word i last line — to ten sam left-justify: `join(' ').padEnd(maxWidth)`. Świadomie je scalam."
- „Ostatnia linia flushowana poza pętlą — in-loop flush obsługuje tylko linie domknięte przez niemieszczące się słowo."

### Related

- **LC 6 Zigzag Conversion** — inna string simulation z formatowaniem pozycyjnym.
- **Sub-pattern „even split + remainder to front"** — `base`/`extra` rozkład reszty pojawia się w round-robin / distribute-candies (np. LC 1103). Warto rozpoznawać jako reużywalny klocek.

## Is Subsequence — wiele zapytań (LC 392, follow-up)

**Pattern:** preprocessing + upper bound + closure jako nośnik stanu

### Key insight

Gdy jedno wejście jest **stałe**, a zapytań jest bardzo dużo (`k ≥ 10⁹`), koszt przenosi się z per-query do preprocessingu. Naiwne rozwiązanie skanuje `t` dla każdego `s` — to `|t|` w pętli po `k`.

Zamiast tego mapujemy `t` **raz**: dla każdego znaku lista pozycji, na których występuje. Listy są posortowane rosnąco _z natury_, bo budujemy je idąc po `t` od lewej — to darmowy niezmiennik, który umożliwia binary search.

Sprawdzanie `s` sprowadza się wtedy do: dla każdej litery znajdź **najmniejszą pozycję w `t` większą od ostatnio zużytej**. To wariant binary search zwany **upper bound**, nie wyszukiwanie równości.

Efekt: `|t|` wylatuje z pętli po `k` i zostaje tylko pod logarytmem.

### Canonical implementation

```javascript
function upperBound(arr, x) {
  let lo = 0;
  let hi = arr.length - 1;
  let ans = -1; // sentinel: brak elementu > x

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);

    if (arr[mid] > x) {
      ans = arr[mid]; // kandydat — ale może istnieje mniejszy
      hi = mid - 1; // ...więc szukaj dalej PO LEWEJ
    } else {
      lo = mid + 1; // za małe, na pewno nie odpowiedź
    }
  }

  return ans;
}

function makeChecker(t) {
  // FAZA 1 — droga, wykonuje się RAZ
  const charIndices = new Map();

  for (let i = 0; i < t.length; i++) {
    const list = charIndices.get(t[i]);
    if (list) list.push(i);
    else charIndices.set(t[i], [i]);
  }

  // FAZA 2 — tania, wykonuje się k RAZY
  return function isSubsequence(s) {
    let pos = -1; // ostatnia zużyta pozycja w t

    for (const char of s) {
      const indices = charIndices.get(char);
      if (indices === undefined) return false;

      const next = upperBound(indices, pos);
      if (next === -1) return false;

      pos = next;
    }

    return true; // pusty s przechodzi sam — brak iteracji
  };
}
```

Użycie:

```javascript
const check = makeChecker("bahbgdc");
check("abc"); // true
check("cb"); // false
```

### Named pitfalls

**1. Zbudowanie mapy i nieużycie jej w fazie sprawdzania**
Najczęstszy błąd przy przejściu z naiwnej wersji: mapa powstaje, ale pętla sprawdzająca dalej iteruje po `t`.
_Root cause:_ faza 2 musi iterować po `s` (krótkim) i robić **lookup**, nigdy po `t`. Jeśli w fazie 2 widzisz `for (... of t)`, optymalizacja nie istnieje — złożoność jest dalej `O(|t|)` per query.

**2. Zapis kandydata w gałęzi `else`**
`ans = arr[mid]` należy **wyłącznie** do gałęzi `arr[mid] > x`.
_Root cause:_ gałąź `else` to gałąź „ten element jest za mały". Nigdy nie może z niej wyjść odpowiedź — zapis tam zwraca element mniejszy od `x`, czyli dokładnie odwrotność zapytania.

**3. Wcześniejszy `return` po trafieniu kandydata**
Kuszące jest `return arr[mid]` zamiast `ans = arr[mid]; hi = mid - 1`.
_Root cause:_ pierwszy napotkany element `> x` nie jest _najmniejszym_ takim elementem. Dla `arr = [0, 4, 5, 7, 9]`, `x = 3`: `mid` trafia na `5`, ale poprawna odpowiedź to `4`, leżąca po lewej. Trzeba dokończyć zawężanie.

**4. `>` zamiast `>=`**
`pos` to pozycja **już zużyta**. Kolejna litera `s` musi wylądować ściśle dalej.
_Root cause:_ `>=` pozwoliłoby dwóm literom `s` zmapować się na ten sam znak `t`, np. `s = "aa"`, `t = "a"` błędnie dałoby `true`.

**5. Podwójny lookup `has()` + `get()`**
To dwa hashowania tego samego klucza.
_Root cause:_ `get()` zwraca `undefined` dla brakującego klucza, co wystarcza jako test. Bezpieczne tutaj, bo listy nigdy nie są puste — powstają dopiero przy pierwszym `push`.

**6. Martwy guard `if (s.length === 0) return true`**
Zbędny w tej architekturze: `for...of` po pustym stringu nie wykonuje iteracji i funkcja dolatuje do `return true`. Guard był potrzebny w wersji two-pointers, gdzie na końcu stało `return false`.

### Complexity

| faza              | ile razy | koszt |
| ----------------- | -------- | ----- | --- | ------------------ | --- | --- |
| preprocessing `t` | 1×       | `O(   | t   | )` czasu i pamięci |
| jedno `check(s)`  | k×       | `O(   | s   | · log              | t   | )`  |

**Razem:** `O(|t| + k · |s| · log|t|)` — plus oznacza fazy następujące po sobie, nie mnożenie.

Naiwnie: `O(k · |t|)`.

Konkretnie dla `|t|` = 10⁶, `|s|` = 10, `k` = 10⁹ (`log₂10⁶ ≈ 20`):

```
naiwnie:            10⁹ · 10⁶        = 10¹⁵
z preprocessingiem: 10⁶ + 10⁹·10·20  ≈ 2 · 10¹¹     (~5000× mniej)
```

Składnik `O(|t|)` jest pomijalny — milion przy dwustu miliardach to szum.

`log|t|` jest górnym ograniczeniem: pojedyncza lista ma długość ≤ `|t|` (przypadek jednej powtarzającej się litery), a suma długości wszystkich list wynosi dokładnie `|t|`.

### Talking points

- „Skoro `t` jest stałe, a zapytań miliard, przenoszę koszt z per-query do preprocessingu. Płacę raz `O(|t|)`, żeby każde zapytanie zeszło z `O(|t|)` na `O(|s| log|t|)`."
- „Rozbijam na dwie fazy przez **closure** — `makeChecker(t)` zwraca funkcję domkniętą nad mapą. Alternatywy: klasa z konstruktorem albo lazy cache w module. Closure najczytelniej wyraża, że stan zależy wyłącznie od `t` i jest niemodyfikowalny między zapytaniami."
- „To nie jest binary search na równość, tylko **upper bound** — pierwszy element ściśle większy od `pos`. Po trafieniu kandydata nie kończę, tylko zapisuję i szukam dalej po lewej."
- „Listy indeksów są posortowane za darmo, bo buduję je skanując `t` od lewej. Nie sortuję niczego."

### Sygnał do rozpoznania patternu

Jedno wejście stałe + wiele zapytań → **zawsze** pytaj o preprocessing. To ten sam ruch co prefix sums, sparse table, trie dla wielu wzorców.

### Related problems

- **LC 392** Is Subsequence — wersja podstawowa (two pointers, `O(|s| + |t|)`)
- **LC 704** Binary Search — kanoniczny wariant na równość
- **LC 35** Search Insert Position — lower bound
- **LC 34** Find First and Last Position — lower + upper bound razem
- **LC 300** LIS — `O(n log n)` opiera się na tym samym prymitywie
- **LC 792** Number of Matching Subsequences — bezpośrednie rozszerzenie tego zadania
- **LC 303** Range Sum Query — ten sam sygnał (preprocessing pod wiele zapytań)

### Uwaga o `mid`

`Math.floor((lo + hi) / 2)` i `lo + Math.floor((hi - lo) / 2)` są **algebraicznie identyczne** dla całkowitych `lo`. Druga wersja istnieje tylko po to, by uniknąć przepełnienia `int32` w Javie/C++ (słynny bug w `Arrays.binarySearch` w JDK). W JS liczby to double'e — `lo + hi` nie przekroczy `MAX_SAFE_INTEGER` nawet dla maksymalnej tablicy. Pierwsza wersja jest poprawna, wybierana świadomie.

## Two Pointers — converging (posortowana tablica)

**LC 167 — Two Sum II (Input Array Is Sorted)**

**Key insight:** posortowanie pozwala z JEDNEGO porównania sumy wywnioskować
kierunek ruchu. Za duża suma → jedyny sposób ją zmniejszyć to zmniejszyć
prawy element. Za mała → zwiększyć lewy.

**Niezmiennik:** jeśli rozwiązanie istnieje, leży wewnątrz okna [left, right].
Dowód odrzucenia: gdy `a[left] + a[right] > target`, to dla każdego
j ∈ [left, right) zachodzi `a[j] + a[right] ≥ a[left] + a[right] > target`,
więc `right` nie należy do żadnej pary w oknie → bezpieczne `right--`.

**Kanoniczna implementacja:**

```javascript
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum > target) right--;
    else if (sum < target) left++;
    else return [left + 1, right + 1];
  }
  return [-1, -1];
}
```

**Pitfalle (z root cause):**

1. `while (left <= right)` zamiast `<` — przy `left === right` porównujesz
   element z samym sobą i możesz zwrócić parę tego samego indeksu.
   Root cause: warunek pętli koduje "para", a para wymaga dwóch RÓŻNYCH pozycji.
2. Brak posortowania jako warunku wstępnego — cały argument o odrzucaniu opiera
   się na monotoniczności. Bez sortowania `a[j] ≥ a[left]` nie zachodzi i dowód
   się rozpada. Two pointers na nieposortowanej tablicy jest po prostu BŁĘDNE
   (nie "wolniejsze").
3. Przy duplikatach zwraca inne indeksy niż skan lewostronny — nieistotne przy
   gwarancji unikalności (LC 167), krytyczne w 3Sum.
4. Odruch sięgnięcia po hashmapę (nawyk z LC 1) — łamie constraint O(1) space,
   bo mapa rośnie do n wpisów.

**Złożoność:** czas O(n) — każda iteracja zwęża okno o 1, więc ≤ n kroków.
Pamięć O(1) — dwa indeksy.
Przy n = 3·10⁴: ~30k operacji vs ~450M dla brute force (15 000×).

**Talking points:**

- "Posortowanie to informacja — brute force ją marnuje, binary search
  wykorzystuje częściowo (O(n log n)), two pointers w pełni (O(n))."
- Uzasadnij odrzucenie NIERÓWNOŚCIĄ, nie intuicją — to jest follow-up pytanie.
- Jeśli tablica NIE jest posortowana: sortowanie kosztuje O(n log n), więc
  hashmapa O(n)/O(n) wygrywa czasowo. Wybór two pointers vs hashmapa to
  trade-off czas↔pamięć, nie "lepsze/gorsze".

**Related:** LC 1 (Two Sum, hashmapa), LC 15 (3Sum — two pointers w pętli,
obowiązkowe pomijanie duplikatów), LC 11 (Container With Most Water — ten sam
schemat odrzucania, inne kryterium), LC 125 (Valid Palindrome), LC 977.

## 3Sum (LC 15) — redukcja do Two Sum

### Key insight

3Sum = **dla każdego elementu `x`, znajdź parę sumującą się do `-x`.** Ustalasz jeden element i na reszcie tablicy rozwiązujesz Two Sum z targetem `-x`. Wewnętrzny Two Sum możesz zrobić dwoma sposobami (two-pointers na posortowanej / hashset), ale redukcja jest ta sama.

`sort` robi tu **podwójną robotę**: (1) daje monotoniczność potrzebną dla two-pointers, (2) skleja duplikaty obok siebie, dzięki czemu deduplikacja sprowadza się do pomijania sąsiadów — bez żadnych kluczy.

### Canonical implementation (sorted + two pointers, O(1) space)

```javascript
const threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // early exit: dalej same dodatnie
    if (i > 0 && nums[i] === nums[i - 1]) continue; // outer-skip: pomiń powtórzone x

    let lo = i + 1,
      hi = nums.length - 1;
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      if (sum === 0) {
        res.push([nums[i], nums[lo], nums[hi]]);
        lo++;
        hi--;
        while (lo < hi && nums[lo] === nums[lo - 1]) lo++; // inner-skip lewo
        while (lo < hi && nums[hi] === nums[hi + 1]) hi--; // inner-skip prawo
      } else if (sum < 0) {
        lo++; // za mało → w prawo są większe
      } else {
        hi--; // za dużo → w lewo są mniejsze
      }
    }
  }
  return res;
};
```

Trace dla `i=1` na `[-4,-1,-1,0,1,2]` (fix `-1`, szukaj pary o sumie `+1`):

```
sorted:  -4  -1  -1   0   1   2
idx:      0   1   2   3   4   5
-4  -1  [-1]  0   1  [2]    -1 + -1 + 2 = 0  ->  zapis [-1,-1,2]; lo++ hi--
-4  -1   -1  [0] [1]  2     -1 +  0 + 1 = 0  ->  zapis [-1,0,1];  lo++ hi-- -> koniec
```

### Alternatywna implementacja (hashset inner Two Sum, O(n) space)

```javascript
const threeSum = function (nums) {
  nums.sort((a, b) => a - b); // wciąż potrzebny dla dedup
  const res = [],
    seenTriplets = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    const spotted = new Set();
    for (let j = i + 1; j < nums.length; j++) {
      const wanted = -nums[i] - nums[j];
      if (spotted.has(wanted)) {
        const key = `${nums[i]},${wanted},${nums[j]}`; // SEPARATOR obowiązkowy
        if (!seenTriplets.has(key)) {
          res.push([nums[i], wanted, nums[j]]);
          seenTriplets.add(key);
        }
      } else spotted.add(nums[j]);
    }
  }
  return res;
};
```

### Named pitfalls

**P1 — domyślny `sort()` sortuje leksykograficznie, nie numerycznie.**
Root cause: bez comparatora `sort()` konwertuje elementy na string i porównuje znak-po-znaku.
Counterexample: `[-1,-4,2,10].sort()` -> `[-1,-4,10,2]` (numerycznie chaos; `'-'` i cyfry mają swoje kody).
Fix: zawsze `sort((a, b) => a - b)`.

**P2 — oba dedup-skipy są load-bearing i łapią RÓŻNE klasy duplikatów.**
Root cause: trójka jest definiowana po **zbiorze wartości**, nie po indeksach; po sorcie duplikaty leżą obok siebie.

- Brak **inner-skip** -> `[-2,0,0,2,2]` daje `[[-2,0,2],[-2,0,2]]` (ta sama trójka z innej pary indeksów).
- Brak **outer-skip** -> `[0,0,0,0]` daje `[[0,0,0],[0,0,0]]` (powtórzone `x` w zewnętrznej pętli).
  Uwaga: skip MUSI być po `lo++/hi--`, porównanie do `lo-1`/`hi+1` (właśnie-opuszczona wartość). Wariant „skip przed przesunięciem, porównanie do `lo+1`/`hi-1`" jest równoważny i też poprawny — zweryfikowane; to NIE jest bug.

**P3 — `sort` to warunek poprawności two-pointers, nie optymalizacja.**
Root cause: ruch `lo++` zwiększa sumę, a `hi--` ją zmniejsza wyłącznie dlatego, że w prawo są większe, w lewo mniejsze. Bez sortu ta monotoniczność nie zachodzi -> algorytm gubi rozwiązania. Gdyby ktoś w code review „wyczyścił niepotrzebny sort", złamałby logikę.

**P4 — [wariant hashset] klucz dedup przez konkatenację bez separatora = kolizja.**
Root cause: `"-4"+"10"` jest nieodróżnialne od `"-41"+"0"`.
Counterexample (schemat klucza `${min}${max}${mid}` w ogólności): `[-41,-4,0]` i `[-4,-4,10]` -> oba `"-410-4"`.
W 3Sum ratuje go WYŁĄCZNIE constraint sum=0 (przypina 3. wartość); empirycznie brak kolizji do ±1e5 na 5M prób. Ale to poprawność **przez przypadek, nie przez konstrukcję**.
Fix: separator albo `[a,b,c].sort((x,y)=>x-y).join(",")` -> injektywny z definicji.

### Complexity

- Time: **O(n²)** — `O(n log n)` sort zdominowany przez `O(n²)` pętlę główną.
- Space: **O(1)** dla two-pointers (poza wynikiem; sort in-place) / **O(n)** dla wariantu hashset.

### Talking points

- Redukcja: „3Sum to dla każdego `x` Two Sum na `-x`" — to samo jądro w obu wariantach; różni się tylko JAK rozwiązujesz wewnętrzny Two Sum.
- Znać **oba warianty** i trade-off: two-pointers O(1) space vs hashset O(n). Two-pointers to domyślna odpowiedź.
- Sort robi podwójną robotę (monotoniczność + kanoniczna dedup) — dobre do pokazania, że rozumiem _dlaczego_ on tam jest.
- „Correct by construction vs by accident" na przykładzie klucza-stringa — sygnał seniority.
- Uogólnia się do **kSum**: rekurencja redukująca k -> k-1, z 2-pointer 2Sum jako przypadkiem bazowym.

### Related problems

- Two Sum (LC 1) — hashmap, tablica nieposortowana, zwraca indeksy.
- Two Sum II – Input Array Is Sorted (LC 167) — czysty two-pointers, baza dla 3Sum.
- 3Sum Closest (LC 16) — ten sam szkielet, minimalizujesz `|sum - target|`.
- 4Sum (LC 18) — dwie zewnętrzne pętle + two-pointers; krok w stronę kSum.
