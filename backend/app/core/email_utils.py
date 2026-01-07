from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr
import os
from dotenv import load_dotenv

load_dotenv() # Load variables from .env file

# Configuration: Read from Environment Variables
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MAIL_FROM = os.getenv("MAIL_FROM", MAIL_USERNAME) # Default to username if not set
MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")

# Strict check for Real SMTP
ENABLE_EMAIL = bool(MAIL_USERNAME and MAIL_PASSWORD)

conf = None
if ENABLE_EMAIL:
    try:
        conf = ConnectionConfig(
            MAIL_USERNAME = MAIL_USERNAME,
            MAIL_PASSWORD = MAIL_PASSWORD,
            MAIL_FROM = MAIL_FROM,
            MAIL_PORT = MAIL_PORT,
            MAIL_SERVER = MAIL_SERVER,
            MAIL_STARTTLS = True,
            MAIL_SSL_TLS = False,
            USE_CREDENTIALS = True,
            VALIDATE_CERTS = True
        )
    except Exception as e:
        print(f"CRITICAL: Email configuration failed: {e}")
        # We generally don't want to crash app import, but this disables email features.
        ENABLE_EMAIL = False
else:
    print("WARNING: MAIL_USERNAME or MAIL_PASSWORD missing in .env. Email sending is DISABLED.")

async def send_reset_email(email: EmailStr, otp: str):
    """
    Sends the reset OTP via Real SMTP.
    """
    if not ENABLE_EMAIL:
        print(f"FAILED TO SEND EMAIL to {email}: Email credentials not configured.")
        return False

    print(f"Sending OTP email to {email} via {MAIL_SERVER}...")
    try:
        message = MessageSchema(
            subject="Password Reset Request - Infinite BZ",
            recipients=[email],
            body=f"""
            <html>
                <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-w-md: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px;">
                        <h2 style="color: #333;">Password Reset</h2>
                        <p>You requested a password reset for Infinite BZ.</p>
                        <p>Your OTP code is:</p>
                        <h1 style="color: #22d3ee; font-size: 32px; letter-spacing: 5px;">{otp}</h1>
                        <p>This code expires in 10 minutes.</p>
                        <p style="font-size: 12px; color: #888;">If you didn't request this, please ignore this email.</p>
                    </div>
                </body>
            </html>
            """,
            subtype=MessageType.html
        )
        fm = FastMail(conf)
        await fm.send_message(message)
        print("Email sent successfully.")
        return True
    except Exception as e:
        print(f"EXTREME ERROR: Failed to send email via SMTP: {e}")
        return False
