import { ArrayMinSize, ArrayNotEmpty, IsString } from 'class-validator';

export abstract class AbstractClass {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  userID: string;
}

export class RivalsObject {
  @IsString()
  title: string;
}

export class PollsBodyDto extends AbstractClass {
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  rivals: RivalsObject[];
}

export class PollsDto extends AbstractClass {}

export class PollsDeleteDto {
  @IsString()
  id: string;
}
