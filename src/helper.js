export function checkHeading(str) {
    return /^(\*)(\*)(.*)\*$/.test(str)
}

export function strReplaceStars(str) {
    return str.replace(/^(\*)(\*)|(\*)$/g, '')
}