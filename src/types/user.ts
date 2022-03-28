import { Movie } from "./movie";
import { Review } from "./review";
import { Comment } from "./comment";

export class User {
  constructor(
    private _id: number,
    private _displayName: string,
    private _email: string,
    private _password: string,
    private _myMovieList: Array<Movie>,
    private _myReviewList: Array<Review>,
    private _myCommentList: Array<Comment>,
    private _introContent: string,
    private _iconPath: string,
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get displayName(): string {
    return this._displayName;
  }

  public set displayName(displayName: string) {
    this._displayName = displayName;
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  public get myMovieList(): Array<Movie> {
    return this._myMovieList;
  }

  public set myMovieList(myMovieList: Array<Movie>) {
    this._myMovieList = myMovieList;
  }

  public get myReviewList(): Array<Review> {
    return this._myReviewList;
  }

  public set myReviewList(myReviewList: Array<Review>) {
    this._myReviewList = myReviewList;
  }

  public get myCommentList(): Array<Comment> {
    return this._myCommentList;
  }

  public set myCommentList(myCommentList: Array<Comment>) {
    this._myCommentList = myCommentList;
  }
  public set introContent(introContent: string) {
    this._introContent = introContent;
  }

  public get introContent(): string {
    return this._introContent;
  }
  public set iconPath(iconPath: string) {
    this._iconPath = iconPath;
  }

  public get iconPath(): string {
    return this._iconPath;
  }
}
