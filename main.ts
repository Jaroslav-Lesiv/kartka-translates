import ru from "./locales/ru.json";
import ua from "./locales/ua.json";

export type TLanguage = "ua" | "ru";

export interface ILocale {
  [key: string]: ILocale | string | undefined;
}
export interface ILocales {
  ru: ILocale;
  ua: ILocale;
}

const locales: ILocales = {
  ru,
  ua,
};

const entriesPolyFill = (obj): any =>
  Object.keys(obj).map((key) => [key, obj[key]]);

class Translate {
  language: TLanguage = "ua";

  set lang(language: TLanguage) {
    this.language = language;
  }

  get lang() {
    return this.language;
  }

  t = (key: string, options: any = {}): string => {
    if (!locales || !locales[this.language]) return key;
    let translate = locales[this.language][key] || key;

    if (options) {
      translate = entriesPolyFill(options).reduce(
        (_translate: string, [key, value]: [string, string]): string => {
          return _translate.replace(`{{${key}}}`, value);
        },
        translate
      );
    }
    if (!translate || typeof translate !== "string") return key;

    return translate;
  };
}

const translate = new Translate();

export default translate;
