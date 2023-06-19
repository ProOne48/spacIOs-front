import { autoserializeAs, autoserializeAsArray } from 'dcerialize';
import { Space } from './space';

export class SpaceOwner {
  /**
   * The ID of the space owner
   */
  @autoserializeAs(() => Number) id?: number;

  /**
   * The name of the space owner
   */
  @autoserializeAs(() => String) name?: string;

  /**
   * The email of the space owner
   */
  @autoserializeAs(() => String) email?: string;

  /**
   * The spaces of the space owner
   */
  @autoserializeAsArray(() => Space, () => []) spaces?: Space[];

  /**
   * Hack to prevent the mistaken assignment of objects from one class to a different class
   */
  private readonly _spaceOwner = true;

  constructor(id?: number, name?: string, email?: string, spaces?: Space[]) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.spaces = spaces;
  }
}
