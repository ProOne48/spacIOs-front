import { autoserializeAs, autoserializeAsArray } from 'dcerialize';

export class Place {
  @autoserializeAs(() => String) address: string;

  @autoserializeAs(() => Number, 'business_status') businessStatus: number;

  @autoserializeAs(() => String, 'google_maps_url') googleMapsUrl: string;

  @autoserializeAs(() => Number) latitude: number;

  @autoserializeAs(() => Number) longitude: number;

  @autoserializeAs(() => String) name: string;

  @autoserializeAsArray(() => String, undefined, 'opening_hours') openingHours: string[];

  @autoserializeAs(() => String, 'phone_number') phoneNumber: string;

  @autoserializeAs(() => String, 'place_id') placeId: string;

  @autoserializeAs(() => Number) rating: number;

  @autoserializeAs(() => Number, 'total_rating') totalRatings: number;

  @autoserializeAsArray(() => String) types: string[];

  @autoserializeAs(() => String) website: string;

  constructor(
    address: string,
    businessStatus: number,
    googleMapsUrl: string,
    latitude: number,
    longitude: number,
    name: string,
    openingHours: string[],
    phoneNumber: string,
    placeId: string,
    rating: number,
    totalRatings: number,
    types: string[],
    website: string
  ) {
    this.address = address;
    this.businessStatus = businessStatus;
    this.googleMapsUrl = googleMapsUrl;
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.openingHours = openingHours;
    this.phoneNumber = phoneNumber;
    this.placeId = placeId;
    this.rating = rating;
    this.totalRatings = totalRatings;
    this.types = types;
    this.website = website;
  }
}

export class PlacesListResponse {
  @autoserializeAs(() => Number) count: number;

  @autoserializeAsArray(() => Place)
  places: Place[];

  @autoserializeAs(() => String) status: string;

  constructor(count: number, places: Place[], status: string) {
    this.count = count;
    this.places = places;
    this.status = status;
  }
}
