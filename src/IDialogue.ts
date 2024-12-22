export default interface IDialogue {
    dialogueId: string,
    characterId: string,
    sentence: string,
    nextDialogue: string,
    actions: [],
    options: []
  }