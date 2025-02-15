const mongoose = require('mongoose'); // Make sure mongoose is imported

router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Convert userId to ObjectId type (mongoose automatically converts string to ObjectId)
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
