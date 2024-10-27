import { http, HttpResponse } from "msw";
import { db } from "./db";

export const handlers = [
  http.get("/api/auth/user/", () => {
    const user = db.user.create();
    return HttpResponse.json({ ...user }, { status: 200 });
  }),
  ...db["event"].toHandlers("rest", "/api/"),
  ...db["attendee"].toHandlers("rest", "/api/"),
  ...db["favourite"].toHandlers("rest", "/api/"),
  // http.get("/api/attendees/", () => {
  //   // let attendee = db['attendee'].create()
  //   return HttpResponse.json([{
  //     id: 1,
  //     user: 1,
  //     created_at: 'test'
  //   }, {
  //     id: 2,
  //     user: 1,
  //     created_at: 'test'
  //   }])
  // }),
  //...db["event-favourites"].toHandlers("rest", "/api/events/"),
  http.post("api/auth/login/", () => {
    return HttpResponse.json({
      access: "access.token.string",
      refresh: "",
      user: {
        pk: 1,
        username: "testuser",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 1,
        profile_image:
          "https://res.cloudinary.com/dcwnoaydz/image/upload/v1/media/images/download",
      },
    });
  }),
  http.post("api/auth/token/refresh/", () => {
    return HttpResponse.json({
      access: "access.token.string",
      access_expiration: "2025-01-01T00:00:00.0000Z",
    });
  }),
  http.post("api/auth/logout/", () => {
    return HttpResponse.json({ detail: "Successfully logged out." });
  }),
];
// export const handlers = [
//   http.get('api/auth/user/', () => {
//     return HttpResponse.json({
//         "pk": 1,
//         "username": "testuser",
//         "email": "",
//         "first_name": "",
//         "last_name": "",
//         "profile_id": 1,
//         "profile_image": "https://res.cloudinary.com/dcwnoaydz/image/upload/v1/media/images/download"
//     })
//   }),
// ]
