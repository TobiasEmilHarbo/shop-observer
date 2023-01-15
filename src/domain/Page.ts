export interface Page<T> {
    items: Array<T>
    size: number
    number: number
    totalPages: number
}