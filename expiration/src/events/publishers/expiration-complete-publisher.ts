import { Subjects, Publisher, ExpirationCompleteEvent } from "@nvktickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
