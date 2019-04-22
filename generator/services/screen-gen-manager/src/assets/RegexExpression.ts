export const expression = {
    metaRegExp: /<\s*meta[^>]*>/g,
    baseRegExp: /<base\b[^>]*>([\s\S]*?)/g,
    titleRegExp: /<\s*title[^>]*>\s*([A-Z][a-z]*\s)(.*)<\s*\/s*title>/g,
    linkRegExp: /<\s*link[^>]*>(.*?)/g,
    scriptRegExp: /<script\b[^>]*>([\s\S]*?)<\/script>/gm,
    navRegExp: /<nav\b[^>]*>([\s\S]*?)<\/nav>/g,
    footerRegExp: /<footer\b[^>]*>([\s\S]*?)<\/footer>/g,
    navLinkFullRegExp: /<\s*a\shref="#"[^>]*>[A-Za-z]+<\/a>/g,
    navLinkRegExp: /<\s*a\shref="#"[^>]*/g,
    hrefSingleRegExp: /href="#"/g,
    hrefHomeRegExp: /href="\/"/g
}