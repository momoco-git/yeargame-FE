import IO from '@utils/socket';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Swal from 'sweetalert2';

function GameRoom() {
  const router = useRouter();
  const gameMode = router.query.id;
  const Desktop: boolean = useMediaQuery({ minWidth: 920 });
  const Mobile: boolean = useMediaQuery({ maxWidth: 919 });
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const socket = useMemo(() => {
    return IO();
  }, []);

  const chevronWidth = 40;

  socket.on('Answer', (data) => {
    console.log('받음', data);
  });
  const sendAnswer = () => {
    socket.emit('Answer', '2번팀');
  };

  return (
    <>
      {Desktop ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p>{gameMode}게임룸입니다</p> <div> 이런이런게임 입니다</div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p className="text-2xl pb-4">{gameMode}게임룸입니다</p>
          <button type="button" className="btn bg-primary w-1/2 h-1/5 " onClick={sendAnswer}>
            <span className="text-[10vw]">정답</span>
          </button>
        </div>
      )}
    </>
  );
}

export default GameRoom;
