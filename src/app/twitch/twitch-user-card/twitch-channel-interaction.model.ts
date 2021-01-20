/**
 * A wrapper class to pass the id of the channel, and whether or not it was requested to
 * be pinned or to show it's chat window.
 */
export class TwitchChannelInteraction {

  constructor(
    public id: string,
    public pinned: boolean,
    public showChat: boolean,
  ) { }

}

/**
 * The lists of channel ids that are pinned and showing chat respectively.
 */
export class TwitchChannelInteractionFeedbackLoop {
  constructor(
    public pinned: string[],
    public showingChat: string[]
  ) {}
}
