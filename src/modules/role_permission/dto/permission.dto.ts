import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectName } from 'src/constants/object-name';
import { PermissionAction } from 'src/constants/permission-action';


export class PermissionDto {
  @ApiProperty({
    description: 'description of the action property',
    enum: PermissionAction,
  })
  @IsNotEmpty()
  @IsEnum(PermissionAction)
  action: PermissionAction;

  @ApiProperty({
    description: 'description of the object property',
    enum: ObjectName,
  })
  @IsNotEmpty()
  @IsEnum(ObjectName)
  object: ObjectName;

  @IsNumber()
  role: number;
}
