export interface Language {
    code: string
    name: string
  }


  export interface Country {
    name: string
    native: string
    capital: string
    emoji: string
    currency: string
    languages: Language[]
  }