/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

const sgMail = require("@sendgrid/mail");
//const twilio = require("twilio");

// Setze hier deine API-Schlüssel
sgMail.setApiKey("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");
//const twilioClient = twilio("YOUR_TWILIO_ACCOUNT_SID", "YOUR_TWILIO_AUTH_TOKEN");

exports.sendOrderConfirmation = functions.firestore
  .document("orders/{orderId}")
  .onCreate(async (snap, context) => {
    const order = snap.data();
    const { email, phoneNumber } = order.customerInfo;

    // E-Mail-Benachrichtigung senden
    const msg = {
      to: email,
      from: "no-reply@bioorangen.ch",
      subject: "Bestellbestätigung",
      text: `Vielen Dank für Ihre Bestellung! Ihre Bestellung wurde erfolgreich aufgenommen.`,
    };

    try {
      await sgMail.send(msg);
      console.log("Bestellbestätigung per E-Mail gesendet");
    } catch (error) {
      console.error("Fehler beim Senden der E-Mail:", error);
    }

    // SMS-Benachrichtigung senden
    /*try {
      await twilioClient.messages.create({
        body: `Danke für Ihre Bestellung! Ihre Bestellung wurde erfolgreich aufgenommen.`,
        from: "BioOrangen",
        to: phoneNumber,
      });
      console.log("Bestellbestätigung per SMS gesendet");
    } catch (error) {
      console.error("Fehler beim Senden der SMS:", error);
    }*/
  });
