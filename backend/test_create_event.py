import requests, json
url='http://localhost:8000/api/v1/events'
payload={
    "title":"Test Event",
    "description":"Desc",
    "start_time":"2026-01-10T10:00:00",
    "end_time":"2026-01-10T12:00:00",
    "venue_name":"Venue",
    "venue_address":"Address",
    "image_url":"http://example.com/img.png",
    "category":"Conference",
    "is_free":True,
    "online_event":False,
    "capacity":10,
    "registration_deadline":"2026-01-09T23:59:00",
    "meeting_link":"",
    "meeting_link_private":True,
    "timezone":"UTC",
    "organizer_name":"Test Organizer",
    "organizer_email":"organizer@example.com",
    "price":"0"
}
resp=requests.post(url, json=payload)
print('Status:', resp.status_code)
print('Response:', resp.text)
