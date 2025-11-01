import Profile from "@/models/User";

export async function saveUserController(name) {
  if (!name) return { success: false, message: "Name is required" };

  const user = new Profile({ name });
  await user.save();

  return { success: true, message: "User saved", user };
}

export async function getAllUsersController() {
  const users = await Profile.find({});
  return users;
}

export async function deleteUserController(id) {
  if (!id) return { success: false, message: "User ID is required" };

  const deleted = await Profile.findByIdAndDelete(id);
  if (!deleted) return { success: false, message: "User not found" };

  return { success: true, message: "User deleted" };
}
