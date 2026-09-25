import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListEventsDto } from './dto/list-events.dto';
import { EventsService } from './events.service';
@Controller('events')
export class EventsController { constructor(private readonly events: EventsService) {} @Get() list(@Query() query: ListEventsDto) { return this.events.list(query); } @Get(':slug') detail(@Param('slug') slug: string) { return this.events.getBySlug(slug); } }
