const express = require('express');
const Event = require('../models/Event');
const router = express.Router();
const nodemailer = require('nodemailer');  // Require Nodemailer

// RSVP to an event
router.post('/:id/rsvp', async (req, res) => {
    const { email } = req.body;
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Add the email to the attendees list
        event.attendees.push(email);
        await event.save();

        // Send confirmation email to the attendee
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `RSVP Confirmation for ${event.title}`,
            text: `Thank you for RSVPing to the event: ${event.title} on ${event.date}. We look forward to seeing you there!`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'RSVP successful, but email failed to send.' });
            }
            console.log('Email sent: ' + info.response);
        });

        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
