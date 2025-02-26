import GameBoard from "./gameboard";
import BoardResults from "./boardresults";

const Mainpage = () => {
    return ( 
        <div className="mainpage">
            <GameBoard/>
            <BoardResults/>
        </div>
     );
}
 
export default Mainpage;