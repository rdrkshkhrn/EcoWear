

export async function logoutController (req, res){
    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.status(200).send({ message: "Logged out successfully" });
  }