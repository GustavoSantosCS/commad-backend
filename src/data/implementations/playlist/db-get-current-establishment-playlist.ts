import {
  GetCurrentEstablishmentPlaylistRepository,
  GetEstablishmentByIdRepository
} from '@/data/protocols';
import { GetCurrentEstablishmentPlaylistUseCase } from '@/domain/usecases';
import { left, right } from '@/shared/either';
import { EstablishmentNotFoundError } from '@/domain/errors';

export class DBGetCurrentEstablishmentPlaylist
  implements GetCurrentEstablishmentPlaylistUseCase
{
  private readonly getEstablishmentByIdRepo: GetEstablishmentByIdRepository;
  private readonly getCurrentEstablishmentPlaylistRepo: GetCurrentEstablishmentPlaylistRepository;

  constructor(
    getEstablishmentByIdRepo: GetEstablishmentByIdRepository,
    getCurrentEstablishmentPlaylistRepo: GetCurrentEstablishmentPlaylistRepository
  ) {
    this.getEstablishmentByIdRepo = getEstablishmentByIdRepo;
    this.getCurrentEstablishmentPlaylistRepo =
      getCurrentEstablishmentPlaylistRepo;
  }

  async getCurrentPlaylist(
    userId: string,
    establishmentId: string
  ): Promise<GetCurrentEstablishmentPlaylistUseCase.Response> {
    const establishment = await this.getEstablishmentByIdRepo.getById(
      establishmentId
    );

    if (establishment?.manager.id !== userId)
      return left(new EstablishmentNotFoundError());

    const currentPlaylist =
      await this.getCurrentEstablishmentPlaylistRepo.getEstablishmentPlaylist(
        establishmentId
      );

    const result: GetCurrentEstablishmentPlaylistUseCase.Result = {
      id: currentPlaylist.id,
      name: currentPlaylist.name,
      musics: currentPlaylist.musics,
      isActive: currentPlaylist.isActive,
      createdAt: currentPlaylist.createdAt,
      updatedAt: currentPlaylist.updatedAt
    };

    return right(result);
  }
}