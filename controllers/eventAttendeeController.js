import EventAttendee from "../models/EventAttendee.js";

// GET /eventattendees: Fetch all event attendees
export const getEventAttendees = async (req, res) => {
    try {
        const eventattendees = await EventAttendee.findAll()
        res.status(200).json(eventattendees); // Return all event attendees
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch all event attendees." });
    }
}

// POST /eventattendees: Create a new event attendee
export const createEventAttendee = async (req, res) => {
    const { event_id, user_id } = req.body;

    if (!event_id || !user_id) {
        return res.status(400).json({
            message: "Event_id and user_id are Required"
        })
    }

    try {
        const eventattendee = await EventAttendee.create({ event_id, user_id });

        return res.status(201).json(eventattendee);

    } catch (error) {
        // If it's a Sequelize validation error, respond with the details
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                message: "Validation error",
                errors: error.errors.map((e) => e.message),
            });
        }

        return res.status(500).json({
            message: "Error creating Event Attendee",
            error: error.message,
        });
    }
};

// GET /eventattendees/:id: Fetch a specific event by ID
export const getEventAttendeeById = async (req, res) => {
    const { id } = req.params;

    try {
        const eventattendee = await EventAttendee.findByPk(id)

        if (!eventattendee) {
            return res.status(404).json({ message: "Event Attendee not found." })
        }
        res.status(200).json(eventattendee); // Return the event details

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch Event Attendee." });
    }
}

// PUT /eventattendees/:id: Update event details for a specific event attendee
export const updateEventAttendee = async (req, res) => {
    const { id } = req.params;
    const { event_id, user_id } = req.body;

    // Validation: Ensure at least one field is provided for update
    if (!event_id && !user_id) {
        return res
            .status(400)
            .json({ message: "Event_id or user_id must be provided for Update." });
    }

    try {
        const eventattendee = await EventAttendee.findByPk(id);

        if (!eventattendee) {
            return res.status(404).json({ message: "Event Attendee not found." });
        }

        // Update the event details
        if (event_id) eventattendee.event_id = event_id;
        if (user_id) eventattendee.user_id = user_id;

        await eventattendee.save(); // Save the updated event
        res.status(200).json(eventattendee); // Respond with the updated event

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update event attendee." });
    }
};

// DELETE /events/:id: Delete a specific event by ID
export const deleteEventAttendee = async (req, res) => {
    const { id } = req.params;

    try {
        const eventattendee = await EventAttendee.findByPk(id);

        if (!eventattendee) {
            return res.status(404).json({ message: "Event Attendee not found." });
        }

        await eventattendee.destroy(); // Delete the event attendee from the database
        res.status(200).json({ message: "Event Attendee deleted successfully." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete event attendee." });
    }
};
