import { Comment } from "./comment";
import { format } from "date-fns";
import ja from "date-fns/locale/ja";
/**
 * レビューコメントを表すドメインクラス.
 */
export class Review {
  constructor(
    //レビューID
    private _id: number,
    //ユーザーID
    private _userId: number,
    //映画ID
    private _movieId: number,
    //いいね数
    private _countLike: number,
    //投稿日時
    private _postDate: Date,
    //投稿内容
    private _content: string,
    //リプライコメントの配列
    private _replyCommentList: Array<Comment>,
    // レビューの星の数
    private _countStar: number
  ) {}

  /**
   * 日付のフォーマット
   */
  get formatDate(): string {
    const formatDate = format(this.postDate, "yyyy年MM月dd日 （EEE）", {
      locale: ja,
    });
    return formatDate;
  }

  public get countStar(): number {
    return this._countStar;
  }

  public set countStar(countStar: number) {
    this._countStar = countStar;
  }

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
