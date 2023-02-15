export function paginate(userItems, currentPage, pageSize) {
    return [...userItems].splice(pageSize * (currentPage - 1), pageSize)
}
