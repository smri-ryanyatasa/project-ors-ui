
import WorkspaceService from 'src/services/workspace.service';

export function useWorkspace() {
  const updateCurrentEnv = async (params) => {
    const response = await WorkspaceService.updateCurrentEnv(params);
    return response;
  };

  return { updateCurrentEnv };
}
