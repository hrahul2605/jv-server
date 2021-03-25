import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { VoteService } from './strategies/vote.service';

@WebSocketGateway({ transports: ['websocket'] })
export class VoteGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly voteService: VoteService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('VoteGateway');

  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, id: string): void {
    client.join(id);
    this.logger.log(`Client: ${client.id} joined room: ${id}`);
  }

  @SubscribeMessage('addVote')
  public async addVote(
    client: Socket,
    args: { roomID: string; voteID: string; googleID: string },
  ) {
    if (args.roomID && args.voteID && args.googleID) {
      const rival = await this.voteService.addVote(
        args.voteID,
        args.googleID,
        args.roomID,
      );
      this.server.to(args.roomID).emit('voteUpdate', rival);
    }
  }

  afterInit() {
    this.logger.log('Gateway Initialised');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client Connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected ${client.id}`);
  }
}
