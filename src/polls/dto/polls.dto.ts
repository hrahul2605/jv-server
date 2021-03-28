import { ArrayMinSize, ArrayNotEmpty, IsDate, IsString } from 'class-validator';

export abstract class AbstractClass {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  googleID: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
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
