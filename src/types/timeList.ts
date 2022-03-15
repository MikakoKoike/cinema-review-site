export class TimeList {
  constructor(private _startDate: string, private _endDate: string) {}

  public get startDate(): string {
    return this._startDate;
  }

  public set startDate(startDate: string) {
    this._startDate = startDate;
  }

  public get endDate(): string {
    return this._endDate;
  }

  public set endDate(endDate: string) {
    this._endDate = endDate;
  }
}
