import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import ru from './ru';
import uk from './uk';

export const translate = memoize(
    (key, config) => (i18n.t(key, config).includes('missing') ? key : i18n.t(key, config)),
    (key, config) => (config ? key + JSON.stringify(config) : key),
);

export default function initTranslations() {
    i18n.translations = {
        ru,
        uk,
    };
    i18n.locale = Localization.locale;
    i18n.fallbacks = true;
}