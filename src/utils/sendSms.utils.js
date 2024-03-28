import twilio from "twilio";
import env from "./env.util.js"

export default async function sendSms(phone) {
  try {
    const transport = twilio( env.TWILIO_SID, env.TWILIO_TOKEN );
    transport.messages.create({
      body: "Welcome to the adventure!!",
      from: env.TWILIO_PHONE,
      to: phone,
    });
  } catch (error) {
    throw error;
  }
}
