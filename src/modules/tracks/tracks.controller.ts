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
import { TrackDto } from './models/tracks.model';
import { TracksService } from './services/tracks.service';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}

  @Get()
  public tracks() {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  public async track(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.tracksService.getOneTrack(id);
    await this.checkTrackExistence(id);

    return user;
  }

  @Post()
  @HttpCode(201)
  public async createTrack(@Body() artistsInfo: TrackDto) {
    const invalidMessages = this.tracksService.checkTrackInfo(artistsInfo);
    if (invalidMessages) {
      throw new BadRequestException(invalidMessages);
    }

    return this.tracksService.addOneTrack(artistsInfo);
  }

  @Put(':id')
  public async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() artistsInfo: TrackDto,
  ) {
    const invalidMessages = this.tracksService.checkTrackInfo(artistsInfo);
    if (invalidMessages) {
      throw new BadRequestException(invalidMessages);
    }
    try {
      const artist = await this.tracksService.updateTrack(id, artistsInfo);
      return artist;
    } catch (error) {
      await this.checkTrackExistence(id);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.checkTrackExistence(id);
    this.tracksService.deleteOneTrack(id);
  }

  private async checkTrackExistence(id: string) {
    const artist = await this.tracksService.getOneTrack(id);

    if (!artist) {
      throw new NotFoundException('Track is not found');
    }
  }
}
