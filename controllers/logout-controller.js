export async function logoutController(req, res) {
  res.cookie("token", "", {
    expires: new Date(),
    httpOnly: true,
    secure: true, // Ensure cookies are sent over HTTPS
    sameSite: "None", // Enable cross-origin requests to store cookies
  });
  res.status(200).send({ message: "Logged out successfully" });
}
