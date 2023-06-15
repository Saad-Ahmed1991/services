const getAll=async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.send(allUsers)
    } catch (error) {
        console.log(error)
        res.end()
    }
}

module.exports ={getAll}