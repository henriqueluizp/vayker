export const defaultLang = 'pt';

export const ui = {
  pt: {
    'meta.title': 'Vayker — Viaje. Organize. Repita.',
    'meta.description':
      'Vayker é o app pra organizar viagens em grupo: itinerário colaborativo, divisão de despesas e acerto de contas automático.',
    'footer.tagline':
      'O app pra organizar viagens em grupo sem estresse. Roteiro, gastos e convite por PIN — tudo num só lugar.',
    'footer.product': 'Produto',
    'footer.features': 'Funcionalidades',
    'footer.app': 'App',
    'footer.company': 'Empresa',
    'footer.terms': 'Termos de Uso',
    'footer.privacy': 'Privacidade',
    'footer.contact': 'Contato',
    'footer.status': 'Status',
    'footer.statusLine': 'Disponível agora',
    'footer.statusSub': 'Já na App Store. Google Play em breve.',
    'footer.rights': 'Todos os direitos reservados.',
    'legal.updated': 'Última atualização',
    'backToTop.label': 'Voltar ao topo',
    'lang.switchTo': 'English',
  },
  en: {
    'meta.title': 'Vayker — Travel. Organize. Repeat.',
    'meta.description':
      'Vayker is the app for organizing group trips: collaborative itineraries, expense splitting and automatic settling up.',
    'footer.tagline':
      'The app for organizing group trips without the stress. Itinerary, expenses and PIN invites — all in one place.',
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.app': 'App',
    'footer.company': 'Company',
    'footer.terms': 'Terms of Use',
    'footer.privacy': 'Privacy',
    'footer.contact': 'Contact',
    'footer.status': 'Status',
    'footer.statusLine': 'Available now',
    'footer.statusSub': 'Now on the App Store. Google Play coming soon.',
    'footer.rights': 'All rights reserved.',
    'legal.updated': 'Last updated',
    'backToTop.label': 'Back to top',
    'lang.switchTo': 'Português',
  },
} as const;

export type Lang = keyof typeof ui;
export type UiKey = keyof (typeof ui)[typeof defaultLang];

/** Explicit PT<->EN counterpart for every route — small enough site that a
 *  lookup table is clearer than deriving it from Astro's locale routing,
 *  since the legal-page slugs themselves are translated (termos -> terms). */
const ALT_LANG_PATH: Record<string, string> = {
  '/': '/en',
  '/en': '/',
  '/termos': '/en/terms',
  '/en/terms': '/termos',
  '/privacidade': '/en/privacy',
  '/en/privacy': '/privacidade',
};

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'en' ? 'en' : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** The same page in the other language, for the header's language switcher. */
export function getAlternateLangPath(url: URL): string {
  const path = url.pathname.replace(/\/$/, '') || '/';
  return ALT_LANG_PATH[path] ?? (getLangFromUrl(url) === 'en' ? '/' : '/en');
}
