import { autoserializeAs, autoserializeAsArray } from 'dcerialize';
import { Table } from './table';

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
   * The description of the space
   */
  @autoserializeAs(() => String) description?: string;

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

  /**
   * The duration of the occupation in the space
   */
  @autoserializeAs(() => Number) duration?: number;

  /**
   * The tables of the space
   */
  @autoserializeAsArray(() => Table) tables?: Table[];

  /**
   * Constructor
   *
   * @param id The ID of the space
   * @param name The name of the space
   * @param description The description of the space
   * @param maxCapacity The max capacity of the space
   * @param capacity The current capacity of the space
   * @param spaceOwnerId The space owner ID of the space
   * @param tables The tables of the space
   */
  constructor(
    id?: number,
    name?: string,
    description?: string,
    maxCapacity?: number,
    capacity?: number,
    spaceOwnerId?: number,
    tables?: Table[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.maxCapacity = maxCapacity;
    this.capacity = capacity;
    this.spaceOwnerId = spaceOwnerId;
    this.tables = tables;
  }
}

export class SpaceList {
  /**
   * The list of space-grid
   */
  @autoserializeAsArray(() => Space) items: Space[];

  /**
   * The total of space-grid
   */
  @autoserializeAs(() => Number) total?: number;

  /**
   * Constructor
   * @param items The list of space-grid
   * @param total The total of space-grid
   */
  constructor(items: Space[] = [], total?: number) {
    this.items = items;
    this.total = total;
  }
}

export class SpaceReduced {
  /**
   * The ID of the space
   */
  @autoserializeAs(() => Number) id?: number;

  /**
   * The name of the space
   */
  @autoserializeAs(() => String) name?: string;

  /**
   * The description of the space
   */
  @autoserializeAs(() => String) description?: string;

  /**
   * The max capacity of the space
   */
  @autoserializeAs(() => Number, 'max_capacity') maxCapacity?: number;

  /**
   * Capacity already occupied of the space
   */
  @autoserializeAs(() => Number) capacity?: number;

  /**
   * Tables of the space
   */
  @autoserializeAsArray(() => Table) tables?: Table[];

  /**
   * Constructor
   * @param id The ID of the space
   * @param name The name of the space
   * @param description The description of the space
   * @param maxCapacity The max capacity of the space
   * @param capacity The current capacity of the space
   * @param tables The tables of the space
   */
  constructor(
    id?: number,
    name?: string,
    description?: string,
    maxCapacity?: number,
    capacity?: number,
    tables?: Table[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.maxCapacity = maxCapacity;
    this.capacity = capacity;
    this.tables = tables;
  }

  /**
   * Get the number of people in the table
   * @param tableId
   */
  getPeople(tableId: number): number {
    const table = this.tables?.find((table) => table.id == tableId);

    return table?.nChairs ? table.nChairs : 0;
  }

  getTable(tableId: number): Table | undefined {
    return this.tables?.find((table) => table.id == tableId);
  }
}
