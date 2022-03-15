import { Comment } from "./comment";

export class Review {
  constructor(
    private _id: number,
    private _userId: number,
    private _movieId: number,
    private _countLike: number,
    private _postDate: Date,
    private _content: string,
    private _replyCommentList: Array<Comment>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get userId(): number {
    return this._userId;
  }

  public set userId(userId: number) {
    this._userId = userId;
  }

  public get movieId(): number {
    return this._movieId;
  }

  public set movieId(movieId: number) {
    this._movieId = movieId;
  }

  public get countLike(): number {
    return this._countLike;
  }

  public set countLike(countLike: number) {
    this._countLike = countLike;
  }

  public get postDate(): Date {
    return this._postDate;
  }

  public set postDate(postDate: Date) {
    this._postDate = postDate;
  }

  public get content(): string {
    return this._content;
  }

  public set content(content: string) {
    this._content = content;
  }

  public get replyCommentList(): Array<Comment> {
    return this._replyCommentList;
  }

  public set replyCommentList(replyCommentList: Array<Comment>) {
    this._replyCommentList = replyCommentList;
  }
}
