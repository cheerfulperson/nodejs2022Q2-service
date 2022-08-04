import {
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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
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
  public async createTrack(@Body() artistsInfo: CreateTrackDto) {
    return this.tracksService.addOneTrack(artistsInfo);
  }

  @Put(':id')
  public async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() artistsInfo: UpdateTrackDto,
  ) {
    await this.checkTrackExistence(id);

    const artist = await this.tracksService.updateTrack(id, artistsInfo);
    return artist;
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
