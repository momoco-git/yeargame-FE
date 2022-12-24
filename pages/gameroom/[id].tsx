import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

function GameRoom() {
  const router = useRouter();
  const gameMode = router.query.id;
  const Desktop: boolean = useMediaQuery({ minWidth: 920 });
  const Mobile: boolean = useMediaQuery({ maxWidth: 919 });

  return (
    <>
      {Desktop ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p>{gameMode}게임룸입니다</p>{' '}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p>{gameMode}게임룸입니다</p>
          <button type="button" className="btn bg-primary w-1/2 h-1/5"></button>
        </div>
      )}
    </>
  );
}

export default GameRoom;
