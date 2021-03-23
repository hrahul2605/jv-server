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

@WebSocketGateway({ transports: ['websocket'] })
export class VoteGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('VoteGateway');

  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, id: string): void {
    client.join(id);
    this.logger.log(`Client: ${client.id} joined room: ${id}`);
  }

  @SubscribeMessage('addVote')
  public addVote(
    client: Socket,
    args: { roomID: string; voteID: string; googleID: string },
  ) {
    this.logger.log(args);
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
