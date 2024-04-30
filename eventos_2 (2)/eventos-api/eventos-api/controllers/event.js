const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.getAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            where: {
                organizerId: req.body.user.id,
            }
        });

        if(!events) return res.status(401).json({ msg: "No events found!"});

        res.status(200).json(events);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

exports.getEventByID = async (req, res) => {
    try {
        const event = await prisma.event.findUnique({
            where: {
                id: parseInt(req.params.id),
                organizerId: req.body.user.id,
            },
        });

        if(!event) return res.status(401).json({ msg: "Event not found!"});

        res.status(200).json(event);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

exports.createEvent = async (req, res) => {
    try {
        const { title, description, category,startDate,endDate,location,notes } = req.body.values;

        if(!title || !description || !category || !startDate || !endDate || !location) return res.status(401).json({ msg: "Please fill all fields!"});

        const event = await prisma.event.create({
            data: {
                title,
                description,
                category,
                startDate,
                endDate,
                location,
                notes,
                organizerId : req.body.user.id,
            },
        });

        res.status(200).json(event);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const { title, description, category,startDate,endDate,location,notes } = req.body.values;

        if(!title || !description || !category || !startDate || !endDate || !location) return res.status(401).json({ msg: "Please fill all fields!"});

        const event = await prisma.event.update({
            where: {
                id: parseInt(req.params.id),
                organizerId: req.body.user.id,
            },
            data: {
                title,
                description,
                category,
                startDate,
                endDate,
                location,
                notes,
            },
        });

        res.status(200).json(event);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const event = await prisma.event.delete({
            where: {
                id: parseInt(req.params.id),
                organizerId: req.body.user.id,
            },
        });

        res.status(200).json(event);
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}