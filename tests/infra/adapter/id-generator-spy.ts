import { IDGenerator } from '@/data/protocols';

export class IdGeneratorSpy implements IDGenerator {
  return: string = 'any_id';
  error: Error;
  callQuantity = 0;
  throwsError() {
    this.error = new Error('any_message');
  }

  generate(): string {
    this.callQuantity += 1;
    if (this.error) throw this.error;
    return this.return;
  }
}
