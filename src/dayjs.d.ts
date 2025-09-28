declare module 'dayjs' {
  export default function dayjs(...args: unknown[]): Dayjs
  export interface Dayjs {
    format(pattern?: string): string
    isLeapYear(): boolean
    // 添加更多 Day.js 方法，如 year(), month(), etc.
  }
}
