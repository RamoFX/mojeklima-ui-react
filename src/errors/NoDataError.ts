export class NoDataError extends Error {
  constructor() {
    super('Something went wrong')
    this.name = 'NoDataError'
  }
}
