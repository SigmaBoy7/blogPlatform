export class userDataIsAlreadyTaken extends Error {
  constructor(message, inValidUserInputs) {
    super(message);
    this.name = 'userDataIsAlreadyTaken';
    this.inValidUserInputs = inValidUserInputs;
  }
}
