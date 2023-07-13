import { autoserializeAs } from 'dcerialize';

export class Space {
  /**
   * The ID of the space
   */
  @autoserializeAs(() => Number) id?: number;

  /**
   * The name of the space
   */
  @autoserializeAs(() => String) name?: string;

  /**
   * The max capacity of the space
   */
  @autoserializeAs(() => Number, 'max_capacity') maxCapacity?: number;

  /**
   * The current capacity of the space
   */
  @autoserializeAs(() => Number) capacity?: number;

  /**
   * The space owner ID of the space
   */
  @autoserializeAs(() => Number, 'space_owner_id') spaceOwnerId?: number;
}

export class SpaceList {

  /**
   * The list of spaces-table
   */
  @autoserializeAs(() => Space) items?: Space[];

  /**
   * The total of spaces-table
   */
  @autoserializeAs(() => Number) total?: number;

  /**
   * Constructor
   * @param items The list of spaces-table
   * @param total The total of spaces-table
   */
  constructor(items?: Space[], total?: number) {
    this.items = items;
    this.total = total;
  }
}
