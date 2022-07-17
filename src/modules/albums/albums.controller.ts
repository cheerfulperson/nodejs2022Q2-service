import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumDto } from './models/album.model';
import { AlbumsService } from './services/albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  public albums() {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  public async album(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.albumsService.getOneAlbum(id);
    await this.checkAlbumExistence(id);

    return user;
  }

  @Post()
  @HttpCode(201)
  public async createAlbum(@Body() artistsInfo: AlbumDto) {
    const invalidMessages = this.albumsService.checkAlbumInfo(artistsInfo);
    if (invalidMessages) {
      throw new BadRequestException(invalidMessages);
    }

    return this.albumsService.addOneAlbum(artistsInfo);
  }

  @Put(':id')
  public async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() artistsInfo: AlbumDto,
  ) {
    const invalidMessages = this.albumsService.checkAlbumInfo(artistsInfo);
    if (invalidMessages) {
      throw new BadRequestException(invalidMessages);
    }
    try {
      const artist = await this.albumsService.updateOneAlbum(id, artistsInfo);
      return artist;
    } catch (error) {
      await this.checkAlbumExistence(id);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.checkAlbumExistence(id);
    this.albumsService.deleteOneAlbum(id);
  }

  private async checkAlbumExistence(id: string) {
    const artist = await this.albumsService.getOneAlbum(id);

    if (!artist) {
      throw new NotFoundException('Album is not found');
    }
  }
}
