import { useAuthContext } from 'src/auth/hooks';
import UserService from 'src/services/user.service';

export function useUsers() {
  const { user } = useAuthContext();

  const getUsers = async () => {
    try {
      return await UserService.getUsers();
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const createUser = async (form) => {
    const payload = {
      ...form,
      created_by: user.user_id,
    };

    return await UserService.createUser(payload);
  };

  const deleteUser = async (user) => {
    return await UserService.deleteUser(user);
  };

  return {
    createUser,
    getUsers,
    deleteUser,
  };
}
