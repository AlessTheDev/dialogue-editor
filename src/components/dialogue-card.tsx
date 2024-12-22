import IDialogue from "@/IDialogue"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { ChevronDown, ChevronUp, PlusCircle, Trash2 } from "lucide-react"
import { Label } from "@radix-ui/react-label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Separator } from "./ui/separator"

interface Props {
    dialogue: IDialogue,
    onExpand: () => void,
    onRemove: () => void,
    onUpdate: (field: string, value: any) => void,
    getField: (field: any) => any,
    isExpanded?: boolean
}

const DialogueCard = ({ dialogue, isExpanded, onExpand, onRemove, onUpdate, getField }: Props) => {
    function getActions(): string[] {
        return getField("actions");
    }
    function addAction() {
        const actions = getActions();
        actions.push("");
        onUpdate("actions", actions);
    }

    function updateAction(index: number, value: string) {
        const actions = getActions();
        actions[index] = value;
        onUpdate("actions", actions)
    };

    function removeAction(index: number) {
        let actions = getActions();
        actions = actions.filter((_, i) => i !== index);
        onUpdate("actions", actions)
    };

    

    return (
        <Card className={`border-2 m-5 ${dialogue.dialogueId == "" ? "bg-yellow-200" : ""}`}>
            <CardHeader className="flex flex-row justify-center space-y-0 p-4 items-center">
                <CardTitle className="text-lg font-medium">
                    {dialogue.dialogueId}
                </CardTitle>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onExpand()}>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemove()}
                    >
                        <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                </div>
            </CardHeader>

            {isExpanded && (
                <CardContent className="pt-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor={dialogue.dialogueId}>Dialogue ID</Label>
                                <Input
                                    id={dialogue.dialogueId}
                                    value={dialogue.dialogueId}
                                    onChange={(e) => onUpdate('dialogueId', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={dialogue.characterId}>Character ID</Label>
                                <Input
                                    id={dialogue.characterId}
                                    value={dialogue.characterId}
                                    onChange={(e) => onUpdate('characterId', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sentence">Sentence</Label>
                        <Textarea
                            id="sentence"
                            value={dialogue.sentence}
                            onChange={(e) => onUpdate('sentence', e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="nextDialogue">Next Dialogue</Label>
                        <Input
                            id="nextDialogue"
                            value={dialogue.nextDialogue}
                            onChange={(e) => onUpdate('nextDialogue', e.target.value)}
                        />
                    </div>

                    <Separator className="my-4" />

                    {/* Actions Section */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <Label>Actions</Label>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addAction()}
                                className="flex items-center gap-2"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Add Action
                            </Button>
                        </div>
                        {dialogue.actions?.map((action, actionIndex) => (
                            <div key={actionIndex} className="flex gap-2">
                                <Input
                                    value={action}
                                    onChange={(e) => updateAction(actionIndex, e.target.value)}
                                    placeholder="PlayAnimation|A_Idle"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeAction(actionIndex)}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}
        </Card>
    )
}

export default DialogueCard