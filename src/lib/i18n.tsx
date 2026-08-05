import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "uz" | "en" | "ru";

type Dict = Record<string, string>;

export const dict: Record<Lang, Dict> = {
  uz: {
    home: "Bosh sahifa",
    down: "Pastga",
    groom: "Otabek",
    bride: "Kumush",
    heroKicker: "Yulduzlar to'la osmon ostida",
    venue: "Navro'z Saroyi · SAMARQAND",
    guest: "— AZIZ MEHMONIMIZ —",
    inviteA: "Farzandlarimizning nikoh to'yi munosabati bilan sizni",
    inviteB: "to'y oqshomiga",
    inviteC: "lutfan taklif etamiz.",
    storyTitle: "Bizning hikoyamiz",
    story1: "Ikki qalbning uchrashuvi taqdir inoyati.",
    story2:
      "Ularning muhabbati sinovlardan o'tib, sabr, ishonch va hurmat bilan yanada mustahkam bo'ldi.",
    story3: "Endi esa bu yo'l — bir umr davom etuvchi baxt yo'liga aylanadi.",
    storyQuote: "\"Sevgi — sabr bilan go'zal, vafo bilan abadiy bo'lur.\"",
    ceremonyTitle: "TO'Y MAROSIMI",
    date: "SANA",
    dateVal: "27.07.2027",
    weekday: "Seshanba",
    time: "VAQT",
    timeVal: "18:00",
    place: "MANZIL",
    placeVal: "Navro'z Saroyi",
    placeVal2: "Samarqand shahri",
    map: "XARITA",
    mapBtn: "Xaritada ochish",
    countdownTitle: "TO'YGA QANCHA QOLDI?",
    days: "KUN",
    hours: "SOAT",
    minutes: "DAQIQA",
    seconds: "SONIYA",
    galleryTitle: "GALEREYA",
    rsvpTitle: "MEHMON TASDIQLASH",
    rsvpSub: "Iltimos, ishtirokingizni bizga ma'lum qiling.",
    name: "Ism Familliyangiz",
    coming: "Kelaman",
    notComing: "Kelolmayman",
    guests: "Odamlar soni",
    note: "Qo'shimcha izoh (ixtiyoriy)",
    send: "Yuborish",
    thanks: "Rahmat! Javobingiz qabul qilindi.",
    finalTitle: "Sizni intiqlik bilan kutamiz!",
    musicTitle: "Sevgi navosi",
    musicSub: "Musiqa ijro etilmoqda...",
    musicPaused: "Musiqani yoqish uchun bosing",
    next: "Keyingi",
    prev: "Oldingi",
  },
  en: {
    home: "Home",
    down: "Scroll",
    groom: "Otabek",
    bride: "Kumush",
    heroKicker: "Under a sky full of stars",
    venue: "Navro'z Palace · SAMARKAND",
    guest: "— DEAR GUEST —",
    inviteA: "On the occasion of our children's wedding, we kindly invite you to",
    inviteB: "the wedding evening",
    inviteC: "with all our heart.",
    storyTitle: "Our story",
    story1: "The meeting of two hearts is a gift of destiny.",
    story2:
      "Their love passed through trials and grew stronger with patience, trust and respect.",
    story3: "And now this path becomes a lifetime of happiness.",
    storyQuote: "\"Love is beautiful with patience, eternal with loyalty.\"",
    ceremonyTitle: "THE CEREMONY",
    date: "DATE",
    dateVal: "27.07.2027",
    weekday: "Tuesday",
    time: "TIME",
    timeVal: "18:00",
    place: "VENUE",
    placeVal: "Navro'z Palace",
    placeVal2: "Samarkand",
    map: "MAP",
    mapBtn: "Open in maps",
    countdownTitle: "COUNTDOWN TO THE DAY",
    days: "DAYS",
    hours: "HOURS",
    minutes: "MINUTES",
    seconds: "SECONDS",
    galleryTitle: "GALLERY",
    rsvpTitle: "GUEST CONFIRMATION",
    rsvpSub: "Please let us know if you can join us.",
    name: "Your full name",
    coming: "I will attend",
    notComing: "I can't attend",
    guests: "Number of guests",
    note: "Additional note (optional)",
    send: "Send",
    thanks: "Thank you! Your reply has been received.",
    finalTitle: "We are looking forward to seeing you!",
    musicTitle: "Melody of love",
    musicSub: "Music is playing...",
    musicPaused: "Tap to play the music",
    next: "Next",
    prev: "Back",
  },
  ru: {
    home: "Главная",
    down: "Вниз",
    groom: "Отабек",
    bride: "Кумуш",
    heroKicker: "Под небом, полным звёзд",
    venue: "Дворец Навруз · САМАРКАНД",
    guest: "— ДОРОГОЙ ГОСТЬ —",
    inviteA: "По случаю свадьбы наших детей мы сердечно приглашаем вас на",
    inviteB: "свадебный вечер",
    inviteC: "с большой радостью.",
    storyTitle: "Наша история",
    story1: "Встреча двух сердец — подарок судьбы.",
    story2:
      "Их любовь прошла испытания и стала крепче благодаря терпению, доверию и уважению.",
    story3: "Теперь этот путь становится дорогой счастья на всю жизнь.",
    storyQuote: "«Любовь красива терпением и вечна верностью.»",
    ceremonyTitle: "СВАДЕБНАЯ ЦЕРЕМОНИЯ",
    date: "ДАТА",
    dateVal: "27.07.2027",
    weekday: "Вторник",
    time: "ВРЕМЯ",
    timeVal: "18:00",
    place: "АДРЕС",
    placeVal: "Дворец Навруз",
    placeVal2: "город Самарканд",
    map: "КАРТА",
    mapBtn: "Открыть на карте",
    countdownTitle: "СКОЛЬКО ОСТАЛОСЬ ДО СВАДЬБЫ?",
    days: "ДНЕЙ",
    hours: "ЧАСОВ",
    minutes: "МИНУТ",
    seconds: "СЕКУНД",
    galleryTitle: "ГАЛЕРЕЯ",
    rsvpTitle: "ПОДТВЕРЖДЕНИЕ",
    rsvpSub: "Пожалуйста, сообщите нам о своём участии.",
    name: "Ваше имя и фамилия",
    coming: "Приду",
    notComing: "Не смогу прийти",
    guests: "Количество человек",
    note: "Дополнительно (необязательно)",
    send: "Отправить",
    thanks: "Спасибо! Ваш ответ получен.",
    finalTitle: "С нетерпением ждём вас!",
    musicTitle: "Мелодия любви",
    musicSub: "Играет музыка...",
    musicPaused: "Нажмите, чтобы включить музыку",
    next: "Далее",
    prev: "Назад",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const LangContext = createContext<Ctx>({
  lang: "uz",
  setLang: () => {},
  t: (k) => dict.uz[k] ?? k,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("uz");

  useEffect(() => {
    const saved = window.localStorage.getItem("wedding-lang") as Lang | null;
    if (saved && saved in dict) setLang(saved);
  }, []);

  const update = (l: Lang) => {
    setLang(l);
    window.localStorage.setItem("wedding-lang", l);
  };

  const t = (k: string) => dict[lang][k] ?? dict.uz[k] ?? k;

  return (
    <LangContext.Provider value={{ lang, setLang: update, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);