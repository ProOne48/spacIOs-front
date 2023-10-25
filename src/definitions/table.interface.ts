export interface TableModalInterface {
  id?: number;
  nChairs?: number;
  tableNumber?: number;
  reservable?: boolean;
}

export interface QRCodeModalInterface {
  qrCode: Blob;
  tableNumber?: number;
  tableId?: number;
  spaceId?: number;
}
