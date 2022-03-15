
/**
 * レビュー記事に対するコメントを表すドメインクラス.
 */
export class Comment {
  constructor(
    //コメントID
    private _id: number,
    //ユーザーID
    private _userId: number,
    //レビューID
    private _reviewId: number,
    //投稿日時
    private _postDate: Date,
    //内容
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
