import { useState } from "react";
import ButtonIcon from "./components/button-icon"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"

import { Import, PlusCircle, Save } from "lucide-react"
import IDialogue from "./IDialogue";
import DialogueCard from "./components/dialogue-card";

function App() {
  const [dialogues, setDialogues] = useState<IDialogue[]>([]);
  const [expandedIndex, setExpandedIndex] = useState(0);

  function existsDialogue(id: string): boolean {
    return dialogues.some(dialogue => dialogue.dialogueId === id)
  }

  function getDefaultDialogueId(): string {
    const prevDialogue = dialogues[dialogues.length - 1];

    if (prevDialogue == null) {
      return "Dialogue_1";
    }

    let newDialogueId = prevDialogue.nextDialogue;

    // Check if it already exists
    if (newDialogueId != "NONE" && !existsDialogue(newDialogueId)) {
      return newDialogueId;
    }

    // Generate a new one based on the previous
    const prevDialogueId = prevDialogue.dialogueId;
    if (prevDialogueId.includes("_")) {
      const lastUnderscore = prevDialogueId.lastIndexOf("_");
      const name = prevDialogueId.slice(0, lastUnderscore);
      const index = prevDialogueId.slice(lastUnderscore + 1, prevDialogueId.length);

      return `${name}_${parseInt(index) + 1}`;
    }
    return `${prevDialogueId}_1`
  }

  function addNewDialogue() {
    setDialogues([...dialogues, {
      dialogueId: getDefaultDialogueId(),
      characterId: '',
      sentence: '',
      nextDialogue: 'NONE',
      actions: [],
      options: []
    }]);
    setExpandedIndex(dialogues.length);
  }

  function updateDialogue(index: number, field: string, _value: any) {
    let value = _value;
    if (field == "dialogueId") {
      if (existsDialogue(value)) {
        value += "_";
      }
    }
    const updatedDialogues = [...dialogues];
    updatedDialogues[index] = { ...updatedDialogues[index], [field]: value };
    setDialogues(updatedDialogues);
  }

  function removeDialogue(index: number) {
    setDialogues(dialogues.filter((_, i) => i !== index));
  }

  return (
    <>
      <div className="container mx-auto py-6 max-w-4xl">
        <Card className="m-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Dialogue Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6 flex-wrap justify-center">
              <ButtonIcon icon={<Import />} text="Import" onClick={() => { }} />
              <ButtonIcon icon={<Save />} text="Export" onClick={() => { }} />
            </div>

            <div className="space-y">
              {dialogues.map((dialogue, index) =>
                <DialogueCard key={index} dialogue={dialogue}
                  onExpand={() => {
                    if (expandedIndex == index) {
                      setExpandedIndex(-1);
                    } else {
                      setExpandedIndex(index);
                    }
                  }}
                  onRemove={() => removeDialogue(index)}
                  onUpdate={(field, value) => {
                    updateDialogue(index, field, value);
                  }}
                  isExpanded={expandedIndex == index}
                  getField={(field: keyof IDialogue) => {
                    const dialogue = dialogues[index];
                    return dialogue[field];
                  }}
                  
                />)}
            </div>
            <div className="flex justify-center">
              <ButtonIcon icon={<PlusCircle />} text="Add New Dialogue" onClick={addNewDialogue} />
            </div>

          </CardContent>

        </Card>
      </div>
    </>
  )
}

export default App
