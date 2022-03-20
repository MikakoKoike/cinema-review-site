export class TimeList {
  constructor(
    private _place: string,
    private _startDate: string,
    private _endDate: string
  ) {}
  public get place(): string {
    return this._place;
  }

  public set place(place: string) {
    this._place = place;
  }
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
