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
