import User from "@/models/User";

export async function saveUserController(name) {
  if (!name) return { success: false, message: "Name is required" };

  const user = new User({ name });
  await user.save();

  return { success: true, message: "User saved", user };
}

// New function to get all users
export async function getAllUsersController() {
  const users = await User.find({});
  return users;
}
