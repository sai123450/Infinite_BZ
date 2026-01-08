import asyncio
from app.core.database import get_session
from app.models.schemas import Event, EventCreate, User
from app.api.routes import create_event
from unittest.mock import MagicMock
from datetime import datetime

async def test_create_event():
    # Mock user
    mock_user = User(
        id=1,
        email="test@example.com",
        full_name="Test User",
        hashed_password="xxx"
    )

    # Mock payload
    payload = EventCreate(
        title="Debug Event",
        description="Testing creation",
        category="Technology",
        start_time=datetime.now(),
        end_time=datetime.now(),
        venue_name="Test Venue",
        venue_address="123 Test St",
        is_free=True,
        online_event=False,
        organizer_name="Debugger",
        organizer_email="debug@example.com"
    )

    print("Attempting to create event via function call...")
    try:
        # Get real session
        async for session in get_session():
            try:
                # Call logic directly (simulating route)
                # Need to replicate logic from route
                import uuid
                custom_id = f"chk-{uuid.uuid4()}"
                
                raw_data_dump = {
                    "source": "InfiniteBZ", 
                    "created_by": mock_user.email,
                    "organizer_email": payload.organizer_email,
                    "price": payload.price,
                    "capacity": payload.capacity
                }
                
                # Careful with dict structure
                event_dict = payload.dict(exclude={"organizer_email", "price", "capacity"})
                print(f"Payload to Event model: {event_dict}")
                
                new_event = Event(
                    **event_dict,
                    eventbrite_id=custom_id,
                    url=f"https://infinitebz.com/events/{custom_id}", 
                    organizer_name=payload.organizer_name or mock_user.full_name or "Community Member",
                    raw_data=raw_data_dump
                )
                
                session.add(new_event)
                await session.commit()
                await session.refresh(new_event)
                print(f"✅ Success! Event created with ID: {new_event.id}")
                
                # Clean up
                await session.delete(new_event)
                await session.commit()
                print("Cleaned up test event.")
                break # only need one session
                
            except Exception as e:
                print(f"❌ Error during creation: {e}")
                import traceback
                traceback.print_exc()
                
    except Exception as e:
         print(f"❌ Session failure: {e}")

if __name__ == "__main__":
    asyncio.run(test_create_event())
