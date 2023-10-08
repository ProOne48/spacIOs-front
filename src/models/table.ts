import { autoserializeAs } from 'dcerialize';

export class Table {
  /**
   * The ID of the table
   */
  @autoserializeAs(() => Number) id?: number;

  /**
   * The number of the table
   */
  @autoserializeAs(() => Number, 'table_number') tableNumber?: number;

  /**
   * The number of chairs of the table
   */
  @autoserializeAs(() => Number, 'n_chairs') nChairs?: number;

  /**
   * The space ID of the table
   */
  @autoserializeAs(() => Number, 'space_id') spaceId?: number;

  /**
   * If the table is reservable
   */
  @autoserializeAs(() => Boolean) reservable?: boolean;

  /**
   * QR code of the table
   */
  @autoserializeAs(() => String, 'qr_code') qrCode?: string;

  /**
   * If the table is occupied
   */
  @autoserializeAs(() => Boolean) occupied?: boolean;

  /**
   * Constructor
   * @param id The ID of the table
   * @param nChairs The number of chairs of the table
   * @param spaceId The space ID of the table
   * @param reservable If the table is reservable
   * @param qrCode QR code of the table
   * @param number The table number
   * @param occupied If the table is occupied
   */
  constructor(
    id?: number,
    nChairs?: number,
    spaceId?: number,
    reservable?: boolean,
    qrCode?: string,
    occupied?: boolean
  ) {
    this.id = id;
    this.nChairs = nChairs;
    this.spaceId = spaceId;
    this.reservable = reservable;
    this.qrCode = qrCode;
    this.occupied = occupied;
  }
}

export class TableList {
  /**
   * The list of tables
   */
  @autoserializeAs(() => Table) items?: Table[];

  /**
   * The total of tables
   */
  @autoserializeAs(() => Number) total?: number;

  /**
   * Constructor
   *
   * @param items The list of tables
   * @param total The total of tables
   */
  constructor(items?: Table[], total?: number) {
    this.items = items;
    this.total = total;
  }
}
