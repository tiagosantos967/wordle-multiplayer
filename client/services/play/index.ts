import { Play } from "../../../server/services/play/model";
import { useCreateService } from "../../utils/hooks";

export const useCreatePlayService = () => useCreateService<Play>('/api/play');
