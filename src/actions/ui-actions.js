export function setPages(pages) {
    console.log('actions')
    return { type: 'SET_TOTAL_PAGES', payload: pages }
}
export function displayPage(page) {
    return { type: 'DISPLAY_PAGE', payload: page }
}