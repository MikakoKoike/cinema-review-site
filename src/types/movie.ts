import { Genre } from "./genre";
import { ProductionCompany } from "./productionCompany";
import { ProductionCountry } from "./productionCountory";
import { SpokenLanguage } from "./spokenLanguage";

export class Movie {
  constructor(
    private _adult: boolean,
    private _backdrop_path: string,
    private _belongs_to_collection: null,
    private _budget: number,
    private _genres: Array<Genre>,
    private _homepage: string,
    private _id: number,
    private _imdb_id: number,
    private _original_language: string,
    private _original_title: string,
    private _overview: string,
    private _popularity: number,
    private _poster_path: string,
    private _production_companies: Array<ProductionCompany>,
    private _production_countries: Array<ProductionCountry>,
    private _release_date: string,
    private _revenue: number,
    private _runtime: number,
    private _spoken_languages: Array<SpokenLanguage>,
    private _status: string,
    private _tagline: string,
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

  public get belongs_to_collection(): null {
    return this._belongs_to_collection;
  }

  public set belongs_to_collection(belongs_to_collection: null) {
    this._belongs_to_collection = belongs_to_collection;
  }

  public get budget(): number {
    return this._budget;
  }

  public set budget(budget: number) {
    this._budget = budget;
  }

  public get genres(): Array<Genre> {
    return this._genres;
  }

  public set genres(genres: Array<Genre>) {
    this._genres = genres;
  }

  public get homepage(): string {
    return this._homepage;
  }

  public set homepage(homepage: string) {
    this._homepage = homepage;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get imdb_id(): number {
    return this._imdb_id;
  }

  public set imdb_id(imdb_id: number) {
    this._imdb_id = imdb_id;
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

  public get production_companies(): Array<ProductionCompany> {
    return this._production_companies;
  }

  public set production_companies(
    production_companies: Array<ProductionCompany>
  ) {
    this._production_companies = production_companies;
  }

  public get production_countries(): Array<ProductionCountry> {
    return this._production_countries;
  }

  public set production_countries(
    production_countries: Array<ProductionCountry>
  ) {
    this._production_countries = production_countries;
  }

  public get release_date(): string {
    return this._release_date;
  }

  public set release_date(release_date: string) {
    this._release_date = release_date;
  }

  public get revenue(): number {
    return this._revenue;
  }

  public set revenue(revenue: number) {
    this._revenue = revenue;
  }

  public get runtime(): number {
    return this._runtime;
  }

  public set runtime(runtime: number) {
    this._runtime = runtime;
  }

  public get spoken_languages(): Array<SpokenLanguage> {
    return this._spoken_languages;
  }

  public set spoken_languages(spoken_languages: Array<SpokenLanguage>) {
    this._spoken_languages = spoken_languages;
  }

  public get status(): string {
    return this._status;
  }

  public set status(status: string) {
    this._status = status;
  }

  public get tagline(): string {
    return this._tagline;
  }

  public set tagline(tagline: string) {
    this._tagline = tagline;
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
