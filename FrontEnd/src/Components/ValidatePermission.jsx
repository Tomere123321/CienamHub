import axios from "axios";
import { toast } from "react-hot-toast";

export const validatePermission = async (navigate) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User not found");
      navigate("/login");
      return null;
    }

    const { data } = await axios.get("http://localhost:8000/permissions");
    const matchPermissions = data.find((permission) => permission.userId === userId);

    if (!matchPermissions) {
      toast.error("Permissions not found");
      navigate("/login");
      return null;
    }

    localStorage.setItem("userPermission", JSON.stringify(matchPermissions.permissions));
    return matchPermissions.permissions;
  } catch (error) {
    toast.error("Failed to fetch permissions");
    return null;
  }
};

export default validatePermission;