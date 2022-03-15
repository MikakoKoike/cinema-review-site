export class ApiMovie {
  constructor(
    private _adult: boolean,
    private _backdrop_path: string,
    private _genre_ids: Array<number>,
    private _id: number,
    private _original_language: string,
    private _original_title: string,
    private _overview: string,
    private _popularity: number,
    private _poster_path: string,
    private _release_date: string,
    private _title: string,
    private _video: boolean,
    private _vote_average: number,
    private _vote_count: number
  ) {}

  public get adult(): boolean {
    return this._adult;
  }

  public set adult(adult: boolean) {
    this._adult = adult;
  }

  public get backdrop_path(): string {
    return this._backdrop_path;
  }

  public set backdrop_path(backdrop_path: string) {
    this._backdrop_path = backdrop_path;
  }

  public get genre_ids(): Array<number> {
    return this._genre_ids;
  }

  public set genre_ids(genre_ids: Array<number>) {
    this._genre_ids = genre_ids;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get original_language(): string {
    return this._original_language;
  }

  public set original_language(original_language: string) {
    this._original_language = original_language;
  }

  public get original_title(): string {
    return this._original_title;
  }

  public set original_title(original_title: string) {
    this._original_title = original_title;
  }

  public get overview(): string {
    return this._overview;
  }

  public set overview(overview: string) {
    this._overview = overview;
  }

  public get popularity(): number {
    return this._popularity;
  }

  public set popularity(popularity: number) {
    this._popularity = popularity;
  }

  public get poster_path(): string {
    return this._poster_path;
  }

  public set poster_path(poster_path: string) {
    this._poster_path = poster_path;
  }

  public get release_date(): string {
    return this._release_date;
  }

  public set release_date(release_date: string) {
    this._release_date = release_date;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get video(): boolean {
    return this._video;
  }

  public set video(video: boolean) {
    this._video = video;
  }

  public get vote_average(): number {
    return this._vote_average;
  }

  public set vote_average(vote_average: number) {
    this._vote_average = vote_average;
  }

  public get vote_count(): number {
    return this._vote_count;
  }

  public set vote_count(vote_count: number) {
    this._vote_count = vote_count;
  }
}
