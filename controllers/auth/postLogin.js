const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const postLogin = async (req, res) => {
    try {
        const { mail, password } = req.body;

        const user = await User.findOne({ mail: mail.toLowerCase() });

        if(user && (await bcrypt.compare(password, user.password))) {
            return res.status(200).json({
                userDetails: {
                    mail: user.mail,
                    username: user.username,
                }
            });
        }

        return res.status(400).send("Invalid credential. Please try again");
    } catch (err) {
        return res.status(500).send("Somehing went wrong. Please try again");
    }
}

module.exports = postLogin;