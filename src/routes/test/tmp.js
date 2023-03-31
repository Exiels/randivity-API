module.exports = async (req, res) => {
  try {
    return res.status(200).json({ message: "ok"})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
