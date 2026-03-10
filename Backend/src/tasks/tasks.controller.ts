import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post()
    create(@Request() req, @Body() body: { title: string; description?: string }) {
        return this.tasksService.create(req.user.userId, body.title, body.description);
    }

    @Get()
    findAll(@Request() req) {
        return this.tasksService.findAll(req.user.userId);
    }

    @Patch(':id/status')
    updateStatus(
        @Request() req,
        @Param('id') id: string,
        @Body('status') status: string,
    ) {
        return this.tasksService.updateStatus(id, req.user.userId, status);
    }
}
