import { factory, manyOf, oneOf, primaryKey, nullable } from '@mswjs/data';
import { faker } from '@faker-js/faker';
import ProfilePage from '../../src/pages/profiles/ProfilePage';

export const db = factory({
  user: {
    pk: primaryKey(faker.number.int),
    username: faker.internet.userName,
    email: faker.internet.email,
    first_name: faker.person.firstName,
    last_name: faker.person.lastName,
    profile_id: () => faker.number.int({min: 1, max: 100}),
    profile_image: () =>faker.image.url()
  },
  'event': {
    id: primaryKey(faker.number.int),
    title: () =>faker.lorem.words(2),
    starts_at: () => faker.date.recent().toISOString(),
    ends_at: () => faker.date.recent().toISOString(),
    lat: faker.location.latitude,
    long: faker.location.longitude,
    address: faker.location.streetAddress,
    place_id: () =>faker.string.alphanumeric(10),
    created_at: () => faker.date.recent().toISOString(),
    updated_at: () => faker.date.recent().toISOString(),
    is_creator: faker.datatype.boolean,
    profile_id: faker.number.int,
    profile_image: () =>faker.image.url(),
    creator_username: faker.internet.userName,
    is_over: faker.datatype.boolean,
    main_image: () =>faker.image.url(),
    favourite_id: nullable(() => null),
    attendee_id: nullable(() => null),
    favourite_count: () => faker.number.int({min: 0, max: 100}),
    attendee_count: () => faker.number.int({min: 0, max: 100}),
    
  },
  'event-attendees': {
    id: primaryKey(faker.number.int),
    user: faker.number.int,
    event: faker.number.int,
    created_at: () => faker.date.recent().toISOString(),
  },
  'event-favourites': {
    id: primaryKey(faker.number.int),
    user: faker.number.int,
    event: faker.number.int,
    created_at: () => faker.date.recent().toISOString(),
  }
  /* {
    "id": 131,
    "title": "test",
    "starts_at": "2023-09-29T23:00:00Z",
    "ends_at": "2023-09-29T23:00:00Z",
    "lat": "53.4129100000",
    "long": "-8.2438900000",
    "location": "Ireland",
    "place_id": "ChIJ-ydAXOS6WUgRCPTbzjQSfM8",
    "created_at": "2023-09-08T20:59:00.086000Z",
    "updated_at": "2023-09-08T20:59:00.086000Z",
    "is_creator": false,
    "profile_id": 10,
    "profile_image": "https://res.cloudinary.com/dcwnoaydz/image/upload/v1/media/images/user_placeholder",
    "creator_username": "newtest",
    "is_over": true,
    "images": [
      
    ],
    "main_image": null,
    "favourite_id": 27,
    "attendee_id": null,
    "favourite_count": 1,
    "attendee_count": 1
  } */
  
});

