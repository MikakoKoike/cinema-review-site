export class Comment {
  constructor(
    private _id: number,
    private _userId: number,
    private _reviewId: number,
    private _postDate: Date,
    private _content: string
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

  public get reviewId(): number {
    return this._reviewId;
  }

  public set reviewId(reviewId: number) {
    this._reviewId = reviewId;
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
}
