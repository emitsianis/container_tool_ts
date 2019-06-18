export class CreateContainerDto {
  readonly imageName: string;
  readonly containerName: string;
  readonly privatePort: string;
  readonly publicPort: string;
}
