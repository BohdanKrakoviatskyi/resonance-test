'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Locale = 'en' | 'ru'

const STORAGE_KEY = 'resonance-locale'

export const translations = {
  en: {
    nav: {
      audioUi: 'Audio & UI',
      howItWorks: 'How it works',
      download: 'Download',
      github: 'GitHub',
    },
    hero: {
      pillPrefix: 'One desktop library for',
      title: 'Your underground tracks and main library in one window.',
      subtitle:
        'Stop juggling browser tabs. Resonance merges your SoundCloud likes and YouTube Music playlists into a fast, native desktop player with synced lyrics, a 10-band equalizer, and seamless crossfade.',
      downloadCta: 'Download for Desktop',
      githubCta: 'Source on GitHub',
      techMeta:
        'Windows 10/11 (.exe, .msi) · macOS (.dmg) · Linux (.AppImage, .deb, .rpm) · Built with Tauri & Rust',
    },
    features: {
      eyebrow: 'Audio Engine & Interface',
      title: 'Built for people who actually care how their player feels.',
      description:
        'Web players eat hundreds of megabytes of RAM and give you zero control over sound. Resonance runs natively with real audio shaping and interactive controls.',
      lyrics: {
        title: 'Live synced lyrics',
        description:
          'Time-synced lines scroll with the track. Wrong match? Swap the lyrics source in one click.',
        changeBtn: 'Change lyrics',
        tabLyrics: 'Lyrics',
        tabUpNext: 'Up next',
      },
      equalizer: {
        title: 'Equalizer',
        description:
          'Shape the sound band by band, or start from a preset.',
        presets: {
          Flat: 'Flat',
          'Bass boost': 'Bass boost',
          Vocal: 'Vocal',
          Bright: 'Bright',
          Custom: 'Custom',
        },
      },
      crossfade: {
        title: 'Crossfade',
        description:
          'Blend one track into the next so the music never stops.',
        fadeLength: 'Fade length',
        off: 'Off',
        unit: 's',
      },
      appearance: {
        title: 'Adaptive player bar & themes',
        description:
          'The interface pulls ambient colors directly from album artwork, or locks to your custom palette. Click play/pause or scrub the bar below.',
        themes: {
          Ember: 'Ember',
          Rose: 'Rose',
          Moss: 'Moss',
          Ocean: 'Ocean',
          Violet: 'Violet',
        },
      },
      specs: {
        tauriTitle: 'Tauri + Rust core',
        tauriBadge: '< 15 MB RAM on Win · < 300 MB on macOS',
        tauriDesc:
          'No bundled Chromium bloat. Uses up to 15 MB of RAM on Windows and under 300 MB on macOS, staying invisible to your CPU while you game or work.',
        updaterTitle: 'One-click auto-updater',
        updaterBadge: 'GitHub Releases',
        updaterDesc:
          'Checks for signed releases in the background, downloads the delta, and restarts into the new build right from the sidebar.',
        installerTitle: 'Tiny native installers',
        installerBadge: '< 20 MB',
        installerDesc:
          'Signed builds under 20 MB for Windows (.exe, .msi), macOS (Apple Silicon & Intel), and Linux (.AppImage, .deb, .rpm).',
      },
    },
    howItWorks: {
      eyebrow: 'Workflow',
      title: 'From install to first track in under a minute.',
      description:
        'No manual playlist exports or third-party converters. Log in and your library is already there.',
      step1: {
        title: 'Connect accounts',
        description:
          'Sign in to SoundCloud and YouTube Music directly inside Resonance.',
        linked: 'Linked',
        Paused: 'Link',
        scStats: '840 tracks · 11 playlists',
        ytStats: '142 tracks · 4 mixes',
        synced: 'Synced with Resonance',
        mergeSub: 'Real-time library merge',
        syncedPct: '100% synced',
        oauthNote: 'OAuth2 session · Zero external keys',
      },
      step2: {
        title: 'Unified sidebar',
        description:
          'Your playlists, likes, and radio mixes appear together in one clean tree.',
        tracksUnit: 'tracks',
        favoritesName: 'Favorites',
        filterAll: 'All',
      },
      step3: {
        title: 'Audio normalization',
        description:
          'Balances loudness across quiet and loud tracks without clipping or distortion.',
        widgetTitle: 'Audio normalization',
        widgetSub: 'No clipping or distortion',
        enabled: 'Enabled',
        disabled: 'Disabled',
        targetLoudness: 'Target loudness',
        quiet: 'Quiet (-18 LUFS)',
        standard: 'Standard (-14 LUFS)',
        loud: 'Loud (-11 LUFS)',
        limiterActive: 'Limiter: Active',
        limiterBypassed: 'Limiter: Bypass',
      },
      step4: {
        title: 'Hit play',
        description:
          'Queue tracks across both platforms with live lyrics and waveform scrubbing.',
        tabLyrics: 'Lyrics',
        tabUpNext: 'Up next',
      },
    },
    download: {
      eyebrow: 'Latest Release',
      title: 'Get Resonance for your desktop',
      description:
        'Free and open source. Direct installers fetched straight from the latest signed GitHub release.',
      also: 'Also:',
      sourcePrefix: 'Prefer to build from source?',
      sourceLink: 'Clone the repository on GitHub',
      platforms: {
        windowsDetail: 'Windows 10 / 11 (64-bit)',
        windowsPrimary: 'Download Installer',
        windowsSecondary: '.msi package',
        macosDetail: 'macOS 13+ (Apple Silicon & Intel)',
        macosPrimary: 'Apple Silicon',
        macosSecondary: 'Intel (.dmg)',
        linuxDetail: 'Wayland / X11, PipeWire / PulseAudio',
        linuxPrimary: 'Download',
      },
    },
    footer: {
      description:
        'Native desktop player for SoundCloud and YouTube Music built with Tauri & Rust. Independent open-source project, not affiliated with SoundCloud or Google.',
      releases: 'Releases',
    },
  },
  ru: {
    nav: {
      audioUi: 'Звук и UI',
      howItWorks: 'Как это работает',
      download: 'Скачать',
      github: 'GitHub',
    },
    hero: {
      pillPrefix: 'Единая медиатека для',
      title: 'Твой андерграунд и главная медиатека в одном окне.',
      subtitle:
        'Хватит держать открытыми десятки вкладок. Resonance объединяет лайки SoundCloud и плейлисты YouTube Music в быстрый нативный десктоп-плеер с синхронным текстом песен, эквалайзером и плавным кроссфейдом.',
      downloadCta: 'Скачать для ПК',
      githubCta: 'Исходный код на GitHub',
      techMeta:
        'Windows 10/11 (.exe, .msi) · macOS (.dmg) · Linux (.AppImage, .deb, .rpm) · На базе Tauri и Rust',
    },
    features: {
      eyebrow: 'Аудио-движок и интерфейс',
      title: 'Создан для тех, кому важны звук и детали интерфейса.',
      description:
        'Браузерные вкладки съедают сотни мегабайт памяти и не дают контроля над звуком. Resonance работает нативно, предоставляя гибкую настройку частот и живой интерфейс.',
      lyrics: {
        title: 'Синхронный текст песен',
        description:
          'Строчки плавно идут в такт музыке. Не совпал текст? Смени источник лирики в один клик.',
        changeBtn: 'Сменить текст',
        tabLyrics: 'Текст',
        tabUpNext: 'Далее',
      },
      equalizer: {
        title: 'Эквалайзер',
        description:
          'Настраивай звучание по полосам вручную или выбери готовый пресет.',
        presets: {
          Flat: 'Flat',
          'Bass boost': 'Bass boost',
          Vocal: 'Vocal',
          Bright: 'Bright',
          Custom: 'Custom',
        },
      },
      crossfade: {
        title: 'Кроссфейд',
        description:
          'Плавное сведение одного трека со следующим без пауз и тишины.',
        fadeLength: 'Длина перехода',
        off: 'Выкл',
        unit: 'с',
      },
      appearance: {
        title: 'Адаптивный плеер и темы',
        description:
          'Интерфейс сам подстраивает цвета под обложку альбома или фиксирует выбранную палитру. Нажми Play/Pause или перемотай волну ниже.',
        themes: {
          Ember: 'Янтарь',
          Rose: 'Роза',
          Moss: 'Мох',
          Ocean: 'Океан',
          Violet: 'Фиолет',
        },
      },
      specs: {
        tauriTitle: 'Ядро Tauri + Rust',
        tauriBadge: '< 15 МБ ОЗУ на Win · < 300 МБ на macOS',
        tauriDesc:
          'Без тяжёлого встроенного браузера. Потребляет до 15 МБ оперативной памяти на Windows и меньше 300 МБ на macOS, не нагружая процессор в играх и работе.',
        updaterTitle: 'Автообновление в 1 клик',
        updaterBadge: 'GitHub Releases',
        updaterDesc:
          'Сам проверяет свежие релизы в фоне, скачивает обновление и перезапускается прямо из бокового меню.',
        installerTitle: 'Лёгкие установщики',
        installerBadge: '< 20 МБ',
        installerDesc:
          'Подписанные сборки весом до 20 МБ для Windows (.exe, .msi), macOS (Apple Silicon и Intel) и Linux (.AppImage, .deb, .rpm).',
      },
    },
    howItWorks: {
      eyebrow: 'Как устроено',
      title: 'От установки до первого трека — меньше минуты.',
      description:
        'Никакого ручного переноса плейлистов или сторонних конвертеров. Просто войди в аккаунт — и вся музыка уже внутри.',
      step1: {
        title: 'Подключи аккаунты',
        description:
          'Авторизуйся в SoundCloud и YouTube Music прямо внутри окна Resonance.',
        linked: 'Связан',
        Paused: 'Войти',
        scStats: '840 треков · 11 плейлистов',
        ytStats: '142 трека · 4 микса',
        synced: 'Синхронизация Resonance',
        mergeSub: 'Общая живая медиатека',
        syncedPct: '100% синхр.',
        oauthNote: 'Прямая OAuth2-сессия · Без ключей',
      },
      step2: {
        title: 'Единый сайдбар',
        description:
          'Твои плейлисты, лайки и радио-миксы собираются в одном удобном списке.',
        tracksUnit: 'треков',
        favoritesName: 'Favorites',
        filterAll: 'Все',
      },
      step3: {
        title: 'Нормализация звука',
        description:
          'Выравнивает громкость между тихими и громкими треками без клиппинга и искажений.',
        widgetTitle: 'Audio normalization',
        widgetSub: 'Без клиппинга и искажений',
        enabled: 'Enabled',
        disabled: 'Disabled',
        targetLoudness: 'Target loudness',
        quiet: 'Quiet (-18 LUFS)',
        standard: 'Standard (-14 LUFS)',
        loud: 'Loud (-11 LUFS)',
        limiterActive: 'Лимитер: Активен',
        limiterBypassed: 'Лимитер: Выкл',
      },
      step4: {
        title: 'Нажми Play',
        description:
          'Ставь в очередь треки с обеих платформ с живым текстом и перемоткой по волне.',
        tabLyrics: 'Текст',
        tabUpNext: 'Далее',
      },
    },
    download: {
      eyebrow: 'Актуальная версия',
      title: 'Скачать Resonance для ПК',
      description:
        'Бесплатно и с открытым исходным кодом. Прямые установщики загружаются напрямую из последнего релиза на GitHub.',
      also: 'Также:',
      sourcePrefix: 'Предпочитаешь собрать из исходников?',
      sourceLink: 'Клонировать репозиторий на GitHub',
      platforms: {
        windowsDetail: 'Windows 10 / 11 (64-бит)',
        windowsPrimary: 'Скачать установщик',
        windowsSecondary: 'пакет .msi',
        macosDetail: 'macOS 13+ (Apple Silicon и Intel)',
        macosPrimary: 'Apple Silicon',
        macosSecondary: 'Intel (.dmg)',
        linuxDetail: 'Wayland / X11, PipeWire / PulseAudio',
        linuxPrimary: 'Скачать',
      },
    },
    footer: {
      description:
        'Нативный десктоп-плеер для SoundCloud и YouTube Music на базе Tauri и Rust. Независимый open-source проект, не связанный с SoundCloud или Google.',
      releases: 'Релизы',
    },
  },
} as const

interface I18nContextValue {
  locale: Locale
  setLocale: (next: Locale) => void
  t: (typeof translations)[Locale]
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: translations.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'ru') {
        setLocaleState(saved)
      }
    } catch {
      // ignore storage errors
    }
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.lang = next
    } catch {
      // ignore storage errors
    }
  }

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t: translations[locale],
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
