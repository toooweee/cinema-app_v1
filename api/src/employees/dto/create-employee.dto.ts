import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateEmployeeSchema = z.object({});

export class CreateEmployeeDto extends createZodDto(CreateEmployeeSchema) {}
