import type { Locale, Localized } from '@/utils/locale';

/** Time zone of the status bar clock: Brazil's official time (UTC−3). */
const clockTimeZone = 'America/Sao_Paulo';

const formatters: Localized<Intl.DateTimeFormat> = {
  pt: createFormatter('pt-BR'),
  en: createFormatter('en-GB'),
};

/**
 * Time of `date` in Brazil, as `HH:mm:ss` on a 24-hour clock.
 *
 * @example
 * formatClock(new Date('2026-10-04T14:05:09Z'), 'en') // '11:05:09'
 */
export function formatClock(date: Date, locale: Locale) {
  return formatters[locale].format(date);
}

function createFormatter(intlLocale: string) {
  return new Intl.DateTimeFormat(intlLocale, {
    timeZone: clockTimeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
}
