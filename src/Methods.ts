
export interface MethodFilter<T> {
    (x: T, i?: number): boolean | Promise<boolean>
}