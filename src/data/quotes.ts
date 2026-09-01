export interface Quote {
  text: string;
  author: string;
  category: 'health' | 'motivation' | 'strength' | 'freedom' | 'wisdom';
}

export const quotes: Quote[] = [
  { text: "Jedyny sposób na wielką pracę to kochać to, co robisz.", author: "Steve Jobs", category: "motivation" },
  { text: "Siła nie pochodzi z tego, co potrafisz. Pochodzi z pokonywania tego, co kiedyś uważałeś za niemożliwe.", author: "Rikki Rogers", category: "strength" },
  { text: "Każdy dzień bez alkoholu to dzień wygrany.", author: "Anonimowy", category: "freedom" },
  { text: "Nie musisz widzieć całych schodów. Po prostu zrób pierwszy krok.", author: "Martin Luther King Jr.", category: "motivation" },
  { text: "Twoje ciało to jedyne miejsce, w którym naprawdę musisz żyć.", author: "Jim Rohn", category: "health" },
  { text: "Odwaga to nie brak strachu, ale decyzja, że coś innego jest ważniejsze niż strach.", author: "Ambrose Redmoon", category: "strength" },
  { text: "Wolność polega na byciu sobą bez pozwolenia.", author: "Anonimowy", category: "freedom" },
  { text: "Po 2 tygodniach bez alkoholu Twoja wątroba zaczyna się regenerować.", author: "Nauka", category: "health" },
  { text: "Nawyk jest najpierw pajęczyną, potem kablem.", author: "Przysłowie hiszpańskie", category: "wisdom" },
  { text: "Najlepszy czas na posadzenie drzewa był 20 lat temu. Drugi najlepszy czas jest teraz.", author: "Przysłowie chińskie", category: "wisdom" },
  { text: "Zmiany nie przychodzą z komfortu. Wzrost zaczyna się na końcu Twojej strefy komfortu.", author: "Roy T. Bennett", category: "motivation" },
  { text: "Po 1 miesiącu bez alkoholu: lepszy sen, więcej energii, jaśniejsze myślenie.", author: "Nauka", category: "health" },
  { text: "To, co jest popularne, nie zawsze jest słuszne. To, co jest słuszne, nie zawsze jest popularne.", author: "Albert Einstein", category: "wisdom" },
  { text: "Cierpliwość jest gorzka, ale jej owoce słodkie.", author: "Jean-Jacques Rousseau", category: "strength" },
  { text: "Nie licz dni. Spraw, by dni się liczyły.", author: "Muhammad Ali", category: "motivation" },
  { text: "Alkohol kradnie Twój jutrzejszy dzień.", author: "Anonimowy", category: "freedom" },
  { text: "Prawdziwa siła to odmówienie sobie czegoś, co Ci nie służy.", author: "Anonimowy", category: "strength" },
  { text: "Po 3 miesiącach bez alkoholu: niższe ciśnienie krwi, lepsza odporność, zdrowsza skóra.", author: "Nauka", category: "health" },
  { text: "Człowiek, który przenosi góry, zaczyna od przenoszenia małych kamieni.", author: "Konfucjusz", category: "wisdom" },
  { text: "Kontrola nad sobą jest większą siłą niż kontrola nad innymi.", author: "Lao Tzu", category: "strength" },
  { text: "Budzisz się bez kaca - to jest luksus, który sobie dajesz.", author: "Anonimowy", category: "freedom" },
  { text: "Twój mózg potrzebuje 14 dni, by zacząć resetować receptory dopaminy.", author: "Nauka", category: "health" },
  { text: "Sukces to suma małych wysiłków, powtarzanych dzień po dniu.", author: "Robert Collier", category: "motivation" },
  { text: "Nie musisz być idealny. Musisz być konsekwentny.", author: "Anonimowy", category: "motivation" },
  { text: "Życie jest zbyt piękne, żeby je przegapić przez mgłę alkoholu.", author: "Anonimowy", category: "freedom" },
  { text: "Po 6 tygodniach: zauważalna poprawa kondycji fizycznej i regeneracji po wysiłku.", author: "Nauka", category: "health" },
  { text: "Dyscyplina to most między celami a ich realizacją.", author: "Jim Rohn", category: "wisdom" },
  { text: "Każdy mistrz był kiedyś katastrofą.", author: "David Goggins", category: "strength" },
  { text: "Pieniądze zaoszczędzone na alkoholu? Policz je. To Twoja nagroda.", author: "Anonimowy", category: "freedom" },
  { text: "Prawdziwa wolność to możliwość dobrze się bawić bez substancji.", author: "Anonimowy", category: "freedom" },
  { text: "Twoja przyszła wersja będzie Ci wdzięczna za dzisiejszą decyzję.", author: "Anonimowy", category: "motivation" },
  { text: "Po 2 miesiącach: poziom tłuszczu w wątrobie spada nawet o 15%.", author: "Nauka", category: "health" },
  { text: "Nie chodzi o to, żeby nigdy nie upaść, ale żeby zawsze wstać.", author: "Nelson Mandela", category: "strength" },
  { text: "Mądrość polega na tym, by wiedzieć, kiedy powiedzieć nie.", author: "Anonimowy", category: "wisdom" },
  { text: "Każda noc czysta to poranek pełen możliwości.", author: "Anonimowy", category: "freedom" },
  { text: "Siła woli jest jak mięsień - im więcej ćwiczysz, tym silniejsza.", author: "Anonimowy", category: "strength" },
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getDailyQuote(): Quote {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return quotes[dayOfYear % quotes.length];
}

export const categoryIcons: Record<Quote['category'], string> = {
  health: '💚',
  motivation: '🔥',
  strength: '💪',
  freedom: '🦅',
  wisdom: '🧠',
};

export const categoryLabels: Record<Quote['category'], string> = {
  health: 'Zdrowie',
  motivation: 'Motywacja',
  strength: 'Siła',
  freedom: 'Wolność',
  wisdom: 'Mądrość',
};
