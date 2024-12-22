export default interface IDialogue {
  dialogueId: string,
  characterId: string,
  sentence: string,
  nextDialogue: string,
  actions: [] | null,
  options: IDialogueOption[] | null
}

export interface IDialogueOption {
  optionName: string,
  optionActions: string[]
}[]