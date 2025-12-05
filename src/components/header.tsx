import StatsDialog from "./stats-dialog"
import GameModeSelect from "./game-mode-select"
import HowToDialog from "./how-to-dialog"

interface HeaderProps {
  highScore: number,
  gameModeTitle: string,
  gameModeKey: string
}

export default function Header ({highScore, gameModeTitle, gameModeKey}: HeaderProps){

return (
    <div className="flex flex-row justify-between pb-4 ">
        <StatsDialog highScore={highScore} gameModeTitle={gameModeTitle}/>
        <GameModeSelect />
        <HowToDialog  gameModeTitle={gameModeTitle} gameModeKey={gameModeKey}/>
    </div>
)
}