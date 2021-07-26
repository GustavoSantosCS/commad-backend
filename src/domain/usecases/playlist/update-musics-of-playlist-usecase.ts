import { PlaylistEntity } from '@/data/entities';
import { PlaylistNotFoundError } from '@/domain/errors';
import { Either } from '@/shared/either';

export interface UpdateMusicsOfPlaylistUseCase {
  updateMusicsOfPlaylist(
    data: UpdateMusicsOfPlaylistUseCase.Param
  ): Promise<UpdateMusicsOfPlaylistUseCase.Response>;
}

// eslint-disable-next-line no-redeclare
export namespace UpdateMusicsOfPlaylistUseCase {
  export type Param = {
    userId: string;
    playlistId: string;
    establishmentId: string;
    musics: { id: string; position: number }[];
  };

  export type Return = Omit<PlaylistEntity, 'establishment' | 'musics'>;
  export type Response = Either<PlaylistNotFoundError, Return>;
}