export class Book {
  BookId: string = '';
  BookName: string = '';
  Price: number = 0;
  Mota: string = '';
  Anhbia: string = '';
  Ngaycapnhat: string = '';
  Soluongton: number = 0;
  MaCD: number = 0;
  MaNXB: number = 0;
}

export interface IBook {
  BookId: string,
  BookName: string,
  Price: number,
  Mota: string,
  Anhbia: string,
  Ngaycapnhat: string,
  Soluongton: number,
  MaCD: number,
  MaNXB: number
}