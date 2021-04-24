import ru from './locales/ru.json';
import ua from './locales/ua.json';

export type TLanguage = 'ua' | 'ru';

export interface ILocale {
  [key: string]: string;
}
export interface ILocales {
  ru: ILocale;
  ua: ILocale;
}

const locales: ILocales = {
  ru,
  ua,
};

// const entriesPolyFill = (obj): any =>
//   Object.keys(obj).map((key) => [key, obj[key]]);

class Translate {
  language: TLanguage = 'ua';

  set lang(language: TLanguage) {
    this.language = language;
  }

  get lang() {
    return this.language;
  }

  t = (key: string, options: any = {}): string => {
    if (!locales || !locales[this.language]) return key;
    let translate = locales[this.language][key] || key;

    if (!translate || typeof translate !== 'string') return key;

    if (options) {
      Object.entries(options).forEach(([key, value]: [string, any]): void => {
        translate.replace(`{{${key}}}`, value);
      });
    }

    return translate;
  };
}

const translate = new Translate();

export default translate;
