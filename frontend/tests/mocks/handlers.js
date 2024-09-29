import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.post('api/auth/login/', () => {
    return HttpResponse.json({
        "access": "access.token.string",
        "refresh": "",
        "user": {
            "pk": 1,
            "username": "testuser",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 1,
            "profile_image": "https://res.cloudinary.com/dcwnoaydz/image/upload/v1/media/images/download"
        }
    })
  }),
  http.post('api/auth/token/refresh/', () => {
    return HttpResponse.json({
      "access": "access.token.string",
      "access_expiration": "2025-01-01T00:00:00.0000Z"
  })
  }),
  http.get('api/auth/user/', () => {
    return HttpResponse.json({
        "pk": 1,
        "username": "testuser",
        "email": "",
        "first_name": "",
        "last_name": "",
        "profile_id": 1,
        "profile_image": "https://res.cloudinary.com/dcwnoaydz/image/upload/v1/media/images/download"
    })
  }),
  http.post('api/auth/logout/', () => {
    return HttpResponse.json({"detail":"Successfully logged out."})
  }),
]