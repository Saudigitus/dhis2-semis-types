export interface D2I18n {
    /**
     * Translates a message string, optionally with interpolation variables.
     * @example i18n.t('Hello {{name}}', { name: 'Edmilson' })
     */
    t: (key: string, options?: Record<string, string | number>) => string

    /**
     * Returns the current active language code (e.g. 'en', 'fr', 'pt').
     */
    language: string

    /**
     * The default language code used when a translation is missing.
     */
    defaultLanguage: string

    /**
     * Changes the current language dynamically.
     * @param languageCode e.g. 'en', 'pt', 'fr'
     */
    setLanguage: (languageCode: string) => void

    /**
     * Adds or overrides translation resources programmatically.
     * @param languageCode The target language (e.g. 'pt')
     * @param namespace The translation namespace (e.g. 'translation')
     * @param resources Key-value pairs of translations
     */
    addResources: (
        languageCode: string,
        namespace: string,
        resources: Record<string, string>
    ) => void

    /**
     * Returns the text direction for the current language ('ltr' or 'rtl').
     */
    dir: () => 'ltr' | 'rtl'

    /**
     * Checks whether a translation key exists.
     */
    exists: (key: string) => boolean

    /**
     * The current translation namespace (usually the app name).
     */
    namespace: string

    /**
     * Adds a default namespace to the lookup chain.
     */
    addDefaultNamespace: (namespace: string) => void
}
