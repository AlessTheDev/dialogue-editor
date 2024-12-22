import { Button } from "./ui/button"
import { ReactNode } from "react"

interface Props {
  icon: ReactNode,
  text: string,
  onClick: () => void
}

const ButtonIcon = ({ icon, text, onClick }: Props) => {
  return (
    <Button className="flex items-center gap-2 b" onClick={onClick}>
      {icon}
      {text}
    </Button>
  )
}

export default ButtonIcon